const header = [
  'FName',
  'LName',
  'Title',
  'Company',
  'Date of Employment',
  'Location',
  'Linkedin Profile',
  'Linkedin Summary',
];

const search_regexp = new RegExp('("|\\,|\\n)', 'g');

const databaseName = 'LI Scrapper DB';
let db;

var request = indexedDB.open(databaseName);

request.onupgradeneeded = (event) => {
  const dbc = event.target.result;
  dbc.createObjectStore('profiles', { keyPath: 'profile' });
};

request.onerror = (event) => {
  console.log('Database error!');
};
request.onsuccess = (event) => {
  db = event.target.result;
};

const processRow = (row) => {
  let finalVal = '';
  row.forEach((column) => {
    const step1 = column ?? '';
    const step2 = step1.replaceAll('"', '""');
    const step3 = search_regexp.test(step2) ? '"' + step2 + '"' : step2;
    finalVal += step3 + ',';
  });
  return finalVal + '\n';
};

const exportToCsv = (rows) => {
  let csvFile = processRow(header);
  rows.forEach((data) => {
    const row = [
      data.firstName,
      data.lastName,
      data.title,
      data.company,
      data.empdate,
      data.loc,
      data.profile,
      data.summary,
    ];
    csvFile += processRow(row);
  });
  return 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvFile);
};

const handleExtensionClick = (tab) => {
  // Scrap Info
  if (
    tab.url.includes('https://www.linkedin.com/in/') ||
    tab.url.includes('https://www.linkedin.com/talent/profile/')
  ) {
    chrome.tabs.sendMessage(
      tab.id,
      {
        method: 'ScrapInfo',
      },
      null,
      (response) => {
        console.log(response);
        if (!db || !response?.data) {
          return;
        }

        const { data } = response;

        const transaction = db.transaction(['profiles'], 'readwrite');
        const store = transaction.objectStore('profiles');
        console.log(data);
        store.get(data.profile).onsuccess = (event) => {
          const existingData = event.target.result;
          console.log(existingData);
          if (existingData) {
            chrome.tabs.sendMessage(tab.id, {
              method: 'Duplicate',
            });

            return;
          }

          store.add(data).onsuccess = () => {
            chrome.tabs.sendMessage(tab.id, {
              method: 'SaveSuccess',
            });
          };
        };
      }
    );
  }
};

function downloadCSV() {
  if (!db) {
    return;
  }

  const transaction = db.transaction(['profiles'], 'readwrite');
  const store = transaction.objectStore('profiles');
  store.getAll().onsuccess = (event) => {
    const profiles = event.target.result;
    if (!profiles?.length) {
      return;
    }

    store.clear();

    var filename = 'linkedin-result';
    chrome.downloads.download({
      url: exportToCsv(profiles),
      filename: filename + '.csv',
    });
  };
}

const changeIcon = (tab) => {
  const isActive =
    tab.url.includes('https://www.linkedin.com/in/') ||
    tab.url.includes('linkedin.com/talent/profile/');

  chrome.action.setIcon({
    path: isActive ? '/assets/icon.png' : '/assets/disabled-icon.png',
  });
};

chrome.action.onClicked.addListener(handleExtensionClick);

chrome.contextMenus.removeAll(() => {
  chrome.contextMenus.create(
    {
      id: 'export-saved-profiles',
      documentUrlPatterns: [
        'https://www.linkedin.com/in/*',
        'https://www.linkedin.com/talent/profile/*',
      ],
      enabled: true,
      title: 'Export Saved Profiles',
    },
    () => {
      chrome.contextMenus.onClicked.addListener(downloadCSV);
    }
  );
});

chrome.tabs.onUpdated.addListener(async () => {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  changeIcon(tab);
});

chrome.tabs.onActivated.addListener(async (info) => {
  const tab = await chrome.tabs.get(info.tabId);
  changeIcon(tab);
});
