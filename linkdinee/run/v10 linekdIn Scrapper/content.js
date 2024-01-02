const showAlert = (message, type) => {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.role = 'alert';
  alert.innerHTML = message;

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 5000);
};

chrome.runtime.onMessage.addListener(function (message, sender, callback) {
  //console.log(message.method);
  if (message.method == 'ScrapInfo') {
    console.log("ScrapInfo");
    const data = SaveInfo();
    callback?.({ data });
  } else if (message.method === 'SaveSuccess') {
   // console.log("SaveSuccess");
    showAlert('Profile Saved', 'success');
    callback?.();
  } else if (message.method === 'Duplicate') {
    //console.log("Duplicate");
    showAlert('Profile Already Saved', 'warning');
    callback?.();
  }
});

var mon = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const getText = (selector, context = document, preserveDot = false) => {
  const element = context?.querySelector(selector);

  if (element) {
    //console.log('Element found:', element);
    //console.log('innerText:', element.innerText);
    if(element.innerText){
      return element.innerText
      .replaceAll('·', preserveDot ? '·' : '')
      .replaceAll('–', '-')
      .trim();
    }else{
      //console.log('Element not foundinnerText');
      return '';
    }
    
  } else {
    //console.log('Element not found');
    return '';
  }
};



function SaveInfo() {
  var firstName = '',
    lastName = '',
    loc = '',
    profile = '';
  var title = '',
    company = '',
    empdate = '';
  var summary = '';
  var basic, experience, item, elem, school;

  if (location.pathname.includes('/in/')) {
    const s = getText('.artdeco-hoverable-trigger h1');
    const i = s.indexOf(' ');
    firstName = s.slice(0, i);
    lastName = s.slice(i + 1);
    /*const locationDom = Array.from(
      document.querySelectorAll('.pv-top-card .pv-text-details__left-panel')
    )[1];
    loc = getText('.text-body-small', locationDom);*/
    loc = getText('.mt2.relative .mt2 span.text-body-small');
    profile = window?.location?.origin + window?.location?.pathname;
    const headline = getText(
      '.pv-top-card pv-text-details__left-panel .text-body-medium'
    );

    summary = firstName + ' ' + lastName + '\n';
    summary += headline ? headline + '\n' : '';

    const aboutDOM = document.querySelector('#about')?.parentElement;

    if (aboutDOM) {
      const expand = aboutDOM.querySelector('.inline-show-more-text__button');

      if (expand) {
        expand.click();
      }

      const sum = getText(
        '.pv-shared-text-with-see-more [aria-hidden="true"]',
        aboutDOM
      );

      summary += sum ? sum + '\n' : '';
    }
    //console.log("loc");
    //console.log(loc);
    summary += loc ? loc + '\n' : '';
    //console.log(summary);

    const experienceDOM = document.querySelector('#experience')?.parentElement;

    if (experienceDOM) {
      const experiences = Array.from(
        experienceDOM.querySelectorAll(
          ':scope > .pvs-list__outer-container > ul > li.artdeco-list__item'
        )
      );
      /*console.log("Experience");
      console.log(experiences);*/
      // Experience
      summary += '\n---Experience---\n\n';

      experiences.forEach((exp, index) => {
        const positionsList = exp.querySelector('ul');
        const innerT = positionsList?.innerText || '';
        const isValidPositionList =
          innerT.includes('·') || mon.some((m) => innerT.includes(m));

        if (positionsList && isValidPositionList) {
          let  ecn = getText(
            '[data-field="experience_company_logo"] .t-bold [aria-hidden="true"]',
            exp
          );
          
          if(ecn==''){
             ecn = getText(
              ':scope > div > .display-flex > .display-flex > .display-flex .t-normal',
              exp
            );
             console.log("esscn");
            console.log(ecn);
          }
          //console.log("ecn");
         // console.log(ecn);
          let edor = getText(
            '[data-field="experience_company_logo"] .t-normal [aria-hidden="true"]',
            exp
          );
          if(edor==''){
             edor = getText(
              ':scope > div > .display-flex > .display-flex > .display-flex .t-bold [aria-hidden="true"]',
              exp
            );
            // console.log(ecn);
          }
         // console.log("edor");
          //console.log(edor);

          summary += ecn ? ecn + '\n' : '';
          summary += edor ? edor + '\n' : '';

          const positions = Array.from(
            positionsList.querySelectorAll(':scope > li')
          );

          positions.forEach((position, positionIndex) => {
            let et = getText('.t-bold [aria-hidden="true"]', position);
            console.log(position);
            if(et==''){
              et=edor;
            }
            const innerContainer = position.querySelector(
              '.pvs-list__outer-container'
            );
            //console.log(innerContainer);

            const contentDom = Array.from(
              position.querySelectorAll('.t-black--light')
            );
            //console.log(contentDom);

            const date = getText('[aria-hidden="true"]', contentDom[0], true);

            const split = date.split('·');
            const edr = split[0]?.trim() || '';
            const edu = split[1]?.trim() || '';

            const el = getText('[aria-hidden="true"]', contentDom[1]);
            //const el = '';
            const ed = getText(
              '.pvs-list__outer-container li .visually-hidden',
              innerContainer
            );

            if (index === 0 && positionIndex === 0) {
              title = et;
              company = ecn;
              empdate = `${edr} (${edu})`;
            }

            summary += et ? et + '\n' : '';
            summary += edr ? `${edr} (${edu}) ${el}\n` : '';
            summary += ed ? ed + '\n' : '';
          });
        } else {
          const et = getText('.t-bold [aria-hidden="true"]', exp);

          const ecn = getText('.t-normal [aria-hidden="true"]', exp, true)
            .split('·')?.[0]
            ?.trim();

          const contentDom = Array.from(
            exp.querySelectorAll('.t-black--light')
          );

          const date = getText('[aria-hidden="true"]', contentDom[0], true);
          const split = date.split('·');
          const edr = split[0]?.trim() || '';
          const edu = split[1]?.trim() || '';
          const el = getText('[aria-hidden="true"]', contentDom[1]);
          //const el = '';
          const ed = getText(
            '.pvs-list__outer-container li .visually-hidden',
            exp
          );

          if (index === 0) {
            title = et;
            company = ecn;
            empdate = `${edr} (${edu})`;
          }

          summary += et ? et + '\n' : '';
          summary += ecn ? ecn + '\n' : '';
          summary += edr ? `${edr} (${edu}) ${el}\n` : '';
          summary += ed ? ed + '\n' : '';
        }

        summary += '\n';
      });
    }

    const educationDOM = document.querySelector('#education')?.parentElement;

    if (educationDOM) {
      const educations = Array.from(
        educationDOM.querySelectorAll('ul > li.artdeco-list__item')
      );

      summary += '---Educations---\n\n';

      educations.forEach((education) => {
        const esn = getText('.t-bold [aria-hidden="true"]', education);
        const ednefs = getText(
          '.t-normal:not(.t-black--light) [aria-hidden="true"]',
          education
        );

        const nodes = Array.from(
          education.querySelectorAll('.pvs-list__outer-container li')
        );

        const potentialGrade = getText('.visually-hidden', nodes[0]);
        const isGrade = potentialGrade.includes('Grade:');
        const eg = isGrade ? potentialGrade.replace('Grade:', '') : '';
        const edr = getText('.t-black--light [aria-hidden="true"]', education);
        const ed = getText('.visually-hidden', isGrade ? nodes[1] : nodes[0]);

        summary += esn ? esn + '\n' : '';
        summary += ednefs ? ednefs : '';
        summary += eg ? ' - ' + eg : '';
        summary += edr ? ' - ' + edr + '\n' : '\n';
        summary += ed ? ed + '\n' : '';
        summary += '\n';
      });
    }
  } else if (location.pathname.includes('/talent/profile/')) {
    const s = getText(
      '#profile-container [data-test-row-lockup-full-name]'
    );
    const i = s.indexOf(' ');
    firstName = s.slice(0, i);
    lastName = s.slice(i + 1);
    loc = getText(
      '.profile__topcard-wrapper [data-test-row-lockup-location]'
    );
    profile = getText(
      '[data-test-personal-info-subsection]  .personal-info__content a span'
    );
    const headline = getText(
      '.topcard-condensed__content-left [data-test-row-lockup-headline]'
    );

    summary = firstName + ' ' + lastName + '\n';
    summary += headline ? headline + '\n' : '';

    const expand = document.querySelector('.summary-card__summary a');
    let expandText = null;
    if (expand) {
      expandText = expand.innerText;

      if (expandText.includes('more')) {
        expand.click();

        expandText = document.querySelector(
          '.summary-card__summary a'
        ).innerText;
      }
    }

    const sum = getText('.summary-card__summary').replace(expandText, '');
    summary += sum ? sum + '\n' : '';
    summary += loc ? loc + '\n' : '';

    const experiences = Array.from(
      document.querySelectorAll('.experience-card li')
    );
    // Experience
    summary += '\n---Experience---\n\n';

    experiences.forEach((exp, index) => {
      const positionsList = exp.querySelector('[data-test-position-list]');

      if (positionsList) {
        const ecn = getText(
          '[data-test-grouped-position-entity-company-name]',
          exp
        );
        const edor = getText(
          '[data-test-grouped-position-entity-date-overall-range]',
          exp
        );

        summary += ecn ? ecn + '\n' : '';
        summary += edor ? edor + '\n' : '';

        const positions = Array.from(
          positionsList.querySelectorAll('[data-test-position]')
        );

        positions.forEach((position, positionIndex) => {
          const et = getText(
            '[data-test-grouped-position-entity-title]',
            position
          );
          const edr = getText(
            '[data-test-grouped-position-entity-date-range]',
            position
          );
          const edu = getText(
            '[data-test-grouped-position-entity-duration]',
            position
          );
          const el = getText(
            '[data-test-grouped-position-entity-location]',
            position
          );
          const ed = getText(
            '[data-test-grouped-position-entity-description]',
            position
          );

          if (index === 0 && positionIndex === 0) {
            title = et;
            company = ecn;
            empdate = `${edr} (${edu})`;
          }

          summary += et ? et + '\n' : '';
          summary += edr ? `${edr} (${edu}) ${el}\n` : '';
          summary += ed ? ed + '\n' : '';
        });
      } else {
        const et = getText('[data-test-position-entity-title]', exp);
        const ecn = getText('[data-test-position-entity-company-name] a', exp);
        const edr = getText('[data-test-position-entity-date-range]', exp);
        const edu = getText('[data-test-position-entity-duration]', exp);
        const el = getText('[data-test-position-entity-location]', exp);
        const ed = getText('[data-test-position-entity-description]', exp);

        if (index === 0) {
          title = et;
          company = ecn;
          empdate = `${edr} (${edu})`;
        }

        summary += et ? et + '\n' : '';
        summary += ecn ? ecn + '\n' : '';
        summary += edr ? `${edr} (${edu}) ${el}\n` : '';
        summary += ed ? ed + '\n' : '';
      }

      summary += '\n';
    });

    const educations = Array.from(
      document.querySelectorAll('.education-card li')
    );

    summary += '---Educations---\n\n';

    educations.forEach((education) => {
      const esn = getText(
        '[data-test-education-entity-school-name]',
        education
      );
      const edn = getText(
        '[data-test-education-entity-degree-name]',
        education
      );
      const efs = getText(
        '[data-test-education-entity-field-of-study]',
        education
      );
      const eg = getText('[data-test-education-entity-grade]', education);
      const edr = getText('[data-test-education-entity-dates]', education);
      const ed = getText(
        '.background-entity__summary-definition--description',
        education
      );

      summary += esn ? esn + '\n' : '';
      summary += edn ? edn : '';
      summary += efs ? ' - ' + efs : '';
      summary += eg ? ' - ' + eg : '';
      summary += edr ? ' - ' + edr + '\n' : '\n';
      summary += ed ? ed + '\n' : '';
      summary += '\n';
    });
  }
  //console.log("summaryff");
  //console.log(loc);
  return {
    firstName,
    lastName,
    title,
    company,
    empdate,
    loc,
    profile,
    summary,
  };
}
