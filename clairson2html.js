const fs = require('fs');

const jsonReport = require('./report.json');

let vulSev = {'High': { count: 0, color: 'danger' }, 'Medium': { count: 0, color: 'warning' }, 'Low': { count: 0, color: 'success' }, 'Negligible': { count: 0, color: 'info' }}
let items = ``;

jsonReport.vulnerabilities.forEach((vul,i) => {
    vulSev[vul.severity].count += 1;
    items += `
        <div class="accordion-item">
            <h2 class="accordion-header" id="heading${i}">
            <button style="color: white" class="accordion-button collapsed bg-${vulSev[vul.severity].color}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
               ${vul.featurename} ( ${vul.vulnerability} )
            </button>
            </h2>
            <div id="collapse${i}" class="accordion-collapse collapse" aria-labelledby="heading${i}" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <ul>
                    <li><strong>Package Version:</strong> ${vul.featureversion}</li>
                    <li><strong>Link:</strong> <a href="${vul.link}">${vul.link}</a></li>
                    <li><strong>Fixed by:</strong> ${vul.fixedby}</li>
                </ul>
                ${vul.description}
            </div>
            </div>
        </div>
    `;
});

let summary = `
    <ul>
        ${vulSev.High.count > 0 ? `<li><span class="text-danger"> ${vulSev.High.count} High</span></li>` : '' }
        ${vulSev.Medium.count > 0 ? `<li><span class="text-warning"> ${vulSev.Medium.count} Medium</span></li>` : '' }
        ${vulSev.Low.count > 0 ? `<li><span class="text-success"> ${vulSev.Low.count} Low</span></li>` : '' }
        ${vulSev.Negligible.count > 0 ? `<li><span class="text-info"> ${vulSev.Negligible.count} Negligible</span></li>` : '' }
    </ul>
`;

let htmlReport = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clair Report</title>
    <link rel="stylesheet" href="https://bootswatch.com/5/litera/bootstrap.min.css" >
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <style>
    .dot {
    height: 25px;
    width: 25px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    } 
    </style>
</head>
<body>
    
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid justify-content-center">
    <a class="navbar-brand"><h1>Report</h1></a>
  </div>
</nav>

<div class="container-fluid justify-content-center">
    <h1>Summary</h1>
        ${summary} 
    <h1>Vulnerabities</h1>

    <div class="accordion" id="accordionExample">
        ${items}
    </div>

</div>

</body>
</html>
`;

console.log('Writing to report.html');

fs.writeFile('report.html', htmlReport, function (err) {
  if (err) return console.log(err);
  console.log('Done!');
});


