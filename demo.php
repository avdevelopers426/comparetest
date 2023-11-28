<?php

require_once __DIR__ . '/mpdf_lib/vendor/autoload.php';

$mpdfConfig = array(
    'margin_left' => 0,
    'margin_right' => 0,
    'margin_header' => 0,
    'margin_footer' => 0,
);
$mpdf = new \Mpdf\Mpdf($mpdfConfig);

$header = '<div style="text-align: center; border-bottom: 1px solid #000;">Header content</div>';
$footer = '<div style="text-align: center; border-top: 1px solid #000;">Footer content</div>';

$mpdf->SetHTMLHeader($header);
$mpdf->SetHTMLFooter($footer);
ob_start(); // Start output buffering
?>
<style>
    .container {
        width: 100%;
        padding-left:10px;
        padding-right:10px;
        /*padding-bottom:10px;
        padding-top:10px;;*/
        margin-bottom: 30px;
        padding-bottom: 30px ;
        border-bottom: 1px solid #000;
    }

    .left-column {
        width: 35%;
        float: left;
    }

    .left-column img {
        width: 100%;
    }
    .image-row{
        margin-top: 10px;
    }
    .image-row .image-row-inner {
        width: 33.33%;
        display: inline-block; /* Change from float to display: inline-block */
        float: left;
    }
    .plr-5{
        padding: 0 5px;
    }
    .right-column {
        width: 65%;
        float: left;
    }

    .right-column-inner {
        padding-left: 20px;
    }

    h1, p {
        margin: 0;
    }

    .read-more {
        margin-top: 20px;
    }
</style>

<div class="container">
    <div class="left-right-main">
    <div class="left-column">
        <img src="img/img.jpg" alt="Image" />
        <div class="image-row">
            <div  class="image-row-inner"><div class="plr-5"><img src="img/img.jpg" alt="Image" /></div></div>
            <div  class="image-row-inner"><div class="plr-5"><img src="img/img.jpg" alt="Image" /></div></div>
            <div  class="image-row-inner"><div class="plr-5"><img src="img/img.jpg" alt="Image" /></div></div>
        </div>
    </div>
    <div class="right-column">
        <div class="right-column-inner">
        <div>
            <h1>Lorem Picsum</h1>
        </div>
        <div>
            <p>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.
                The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's
                De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with
            </p>
        </div>
        <div class="read-more">
            <a href="#">Read More</a>
        </div>
        <div>
            <table>
                <tr>
                    <th>Color</th>
                    <td>Value</td>
                </tr>
                <tr>
                    <th>Color</th>
                    <td>Value</td>
                </tr>
                <tr>
                    <th>Color</th>
                    <td>Value</td>
                </tr>
                <tr>
                    <th>Color</th>
                    <td>Value</td>
                </tr>
                <tr>
                    <th>Color</th>
                    <td>Value</td>
                </tr>
                <tr>
                    <th>Color</th>
                    <td>Value</td>
                </tr>
            </table>
        </div>
        </div>
    </div>
    </div>
    <div>
        <p>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.
            The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's
            De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with
        </p>
        <p>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.
            The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's
            De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with
        </p>
        <p>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.
            The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's
            De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with
        </p>
        <p>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.
            The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's
            De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with
        </p>
    </div>
</div>

<?php
$output = ob_get_clean();
for ($i=0; $i < 5; $i++) { 
    $mpdf->WriteHTML($output);
}

$mpdf->Output();
?>
