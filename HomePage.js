import {stocksymbols , testando} from './modules/test.js'
import {createTable , addRowToTable, addHeaderToRow, addDataToRow, removeTable, createTableFromObject} from './modules/ConvertingObjects.js';
import {CSVtoJSON} from './modules/CSVtoJSON.js'

let cabecalho = document.getElementById("cabecalho");
let userProfile = document.getElementById("userProfile");
let openProfileButton = document.getElementById("profileButton");
let closeProfileButton = document.getElementById("closeUserProfile");
let searchBar = document.getElementById("searchbar");
let searchForm = document.getElementById("SearchForm");
let searchedCompanyName = document.getElementById("companyName");
let companyImageLink = document.getElementById("companyImage");
let companyOverviewText = document.getElementById("companyOverview");
let personaliseParagrafo = document.getElementById('personaliseParagrafo');
let separadoresAnalise = document.getElementById('SeparadorAnalise');
let ulSeparadoresDeAnalise = document.getElementById('ulSeparadoresDeAnalise').children;
let mainContainer = document.getElementById('mainContainer');
let overviewDataContainer = document.getElementById("overviewDataContainer");
let fundamentalDataContainer = document.getElementById('fundamentalDataContainer');
let technicalDataContainer = document.getElementById('technicalDataContainer');
let calendarContainer = document.getElementById('calendarContainer');
let overviewSelectOptions = document.getElementsByClassName("overviewSelectOptions");
let incomeStatementOptions = document.getElementById('incomeStatementOption');
let balanceSheetOptions = document.getElementById('balanceSheetOptions');
let cashFlowOptions = document.getElementById('cashFlowOptions');
let companyLogo = document.getElementById("companyLogo");
let companySymbol;
let apiKeyBonvalots = 'NK2X3UYDTIVZTR0Q'
let apiKeySmmbonvalot = 'QXV3WOOLZ164BNU5'
let cashFlowInfo;
let balanceSheetInfo;
let incomeStatementInfo;
let balanceSheetRadioValue;
let incomeStatementRadioValue;
let reqInfoIncomeStatementOptions;
let reqInfoBalanceSheetOptions;
let reqInfoCashFlowOptions;
let cashFlowRadioValue;
let buttonToShowCFTable = document.getElementById("buttonToShowCFTable");
let buttonToShowBSTable = document.getElementById("buttonToShowBSTable");
let buttonToShowISTable = document.getElementById('buttonToShowISTable');
let removeCfTable = document.getElementById('removeCfTable');
let removeBsTable = document.getElementById('removeBsTable');
let removeIsTable = document.getElementById('removeIsTable');
let datasJSON;
let obj = {
    reportDateArray : [],
    fiscalDateEndingArray : [],
};
let InformationMessage = document.getElementById("InformationMessage");

cabecalho.addEventListener("mouseover", changeToInlineBlock);
cabecalho.addEventListener("mouseout" , changeToNone);

function changeToInlineBlock()
{
    document.getElementById("ulcabecalho").style.display = "inline-block";
    InformationMessage.style.display = "none";

}

function changeToNone()
{
    document.getElementById("ulcabecalho").style.display = "none";
    InformationMessage.style.display = "block";
}

function TurnVisible(element)
{
    element.style.visibility = "visible";
    element.style.opacity = 1;
}

function TurnHidden(element)
{
    element.style.visibility = "hidden";
    element.style.opacity = 0;
}

function turnDisplayBlock(element)
{
    element.style.display = "block"
}

function turnDisplayNone(element)
{
    element.style.display = 'none';
}

openProfileButton.addEventListener("click", function()
    {
        if(openProfileButton)
            TurnVisible(userProfile)
    }
)

closeProfileButton.addEventListener("click", function()
    {
        if(closeProfileButton)
            TurnHidden(userProfile)
    }
)
searchForm.addEventListener("submit" , function(event)
    {
        event.preventDefault(); // Evita a submissão normal do formulário
        changeLogoImage(searchBar.value);
        searchCompanieSymbol(searchBar.value);
        TurnVisible(companyLogo);
        TurnVisible(overviewDataContainer);
        TurnVisible(separadoresAnalise);
        TurnVisible(personaliseParagrafo);
        turnDisplayBlock(mainContainer);
    }
)


function searchCompanieSymbol(name)
{
    let searchRegex = new RegExp(name, 'i');

    for(let companie in stocksymbols)
    {
        if(companie.match(searchRegex))
        {
            companySymbol = stocksymbols[companie];
            searchedCompanyName.innerText = companie;
            companyOverview(companySymbol);
            return companySymbol;
        }
        
    } 
}

function companyOverview(companySymbol)
{
    let http = new XMLHttpRequest();

    http.open("GET" , "https://www.alphavantage.co/query?function=OVERVIEW&symbol="+ companySymbol + "&apikey=" + apiKeySmmbonvalot);
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            let companyInfo = JSON.parse(http.responseText);
            companyOverviewText.innerHTML = companyInfo.Description;
        }
    }
}

function getOverviewStatistic(companySymbol , statistic, square)
{

    let http = new XMLHttpRequest();

    http.open("GET" , "https://www.alphavantage.co/query?function=OVERVIEW&symbol="+ companySymbol + "&apikey=" + apiKeySmmbonvalot);
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            let companyInfo = JSON.parse(http.responseText);
            square.nextSibling.nextSibling.innerHTML = companyInfo[statistic];
        }
    }
}



for (let y = 0; y < ulSeparadoresDeAnalise.length ; y++)
    ulSeparadoresDeAnalise[y].addEventListener('click' , function(event){
        for (let x = 0; x < ulSeparadoresDeAnalise.length; x++)
            if (ulSeparadoresDeAnalise[x] == event.target)
            {
                ulSeparadoresDeAnalise[x].style = "text-decoration: overline black;";
                switch(ulSeparadoresDeAnalise[x].id)
                {
                    case 'overviewDataButton' :
                        turnDisplayBlock(overviewDataContainer);
                        turnDisplayNone(fundamentalDataContainer);
                        turnDisplayNone(technicalDataContainer);
                        turnDisplayNone(calendarContainer);
                        turnDisplayNone(recentNewsContainer);
                        turnDisplayNone(nextEventContainer);
                        break;
                    case 'fundamental' :
                        turnDisplayNone(overviewDataContainer);
                        turnDisplayBlock(fundamentalDataContainer);
                        turnDisplayNone(technicalDataContainer);
                        turnDisplayNone(calendarContainer);
                        turnDisplayNone(recentNewsContainer);
                        turnDisplayNone(nextEventContainer);
                        break;
                    case 'technicalSeparadorButton' :
                        turnDisplayNone(overviewDataContainer);
                        turnDisplayNone(fundamentalDataContainer);
                        turnDisplayBlock(technicalDataContainer);
                        turnDisplayNone(calendarContainer);
                        turnDisplayNone(recentNewsContainer);
                        turnDisplayNone(nextEventContainer);
                        objectForChart();
                        break;
                    case 'calendarSeparadorButton' :
                        turnDisplayNone(overviewDataContainer);
                        turnDisplayNone(fundamentalDataContainer);
                        turnDisplayNone(technicalDataContainer);
                        turnDisplayBlock(calendarContainer);
                        turnDisplayNone(recentNewsContainer);
                        turnDisplayNone(nextEventContainer);
                        getCalendar();
                        break;
                    case 'recentNewsSeparador' :
                        turnDisplayNone(overviewDataContainer);
                        turnDisplayNone(fundamentalDataContainer);
                        turnDisplayNone(technicalDataContainer);
                        turnDisplayNone(calendarContainer);
                        turnDisplayBlock(recentNewsContainer);
                        turnDisplayNone(nextEventContainer);
                        getPressRelease(companySymbol);
                        break;
                    case 'nextEventsSeparador' :
                        turnDisplayNone(overviewDataContainer);
                        turnDisplayNone(fundamentalDataContainer);
                        turnDisplayNone(technicalDataContainer);
                        turnDisplayNone(calendarContainer);
                        turnDisplayNone(recentNewsContainer);
                        turnDisplayBlock(nextEventContainer);
                        break;
                }
            }
            else
                ulSeparadoresDeAnalise[x].style = "text-decoration: none;";
    })

for(let x = 0; x < overviewSelectOptions.length; x++) 
    {
        overviewSelectOptions[x].addEventListener("change" , function()
        {
            getOverviewStatistic(companySymbol , overviewSelectOptions[x].value , overviewSelectOptions[x])
        })
    }

if (incomeStatementOptions)
    incomeStatementOptions.addEventListener("change" , function()
    {
        reqInfoIncomeStatementOptions = incomeStatementOptions.value;
        incomeStatementRadioValue = document.forms.incomeStatementRadio.incomeStatementRadioName.value;
        getIncomeStatementInfo(companySymbol, reqInfoIncomeStatementOptions, incomeStatementRadioValue );
    })

if(balanceSheetOptions)
    balanceSheetOptions.addEventListener('change', function()
   {
        reqInfoBalanceSheetOptions = balanceSheetOptions.value;
        balanceSheetRadioValue = document.forms.balanceSheetRadio.balanceSheetRadioName.value;
        getBalanceSheetInfo(companySymbol, reqInfoIncomeStatementOptions, incomeStatementRadioValue )
   })

if(cashFlowOptions)
   cashFlowOptions.addEventListener('change' , function()
   {
        reqInfoCashFlowOptions = cashFlowOptions.value;
        cashFlowRadioValue = document.forms.cashFlowRadio.cashFlowRadioName.value
        getCashFlowInfo(companySymbol)
   })

buttonToShowISTable.addEventListener('click' , function()
{
    incomeStatementRadioValue = document.forms.incomeStatementRadio.incomeStatementRadioName.value;

    let http = new XMLHttpRequest();

    http.open('GET' , "https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=" + companySymbol + "&apikey=" + apiKeySmmbonvalot);
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            incomeStatementInfo = JSON.parse(http.responseText);
            createTableFromObject(incomeStatementInfo[incomeStatementRadioValue][0] , 'generatedIsTable' , incomeStatementTable)
        }
    }
})

removeIsTable.addEventListener('click', function()
{
    removeTable('generatedIsTable');
})

buttonToShowBSTable.addEventListener('click', function()
{
    balanceSheetRadioValue = document.forms.balanceSheetRadio.balanceSheetRadioName.value;

    let http = new XMLHttpRequest();

    http.open('GET' , "https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=" + companySymbol + "&apikey=" + apiKeySmmbonvalot);
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            balanceSheetInfo = JSON.parse(http.responseText);
            createTableFromObject(balanceSheetInfo[balanceSheetRadioValue][0] , 'generatedBsTable' , balanceSheetTable)
        }
    }
})

removeBsTable.addEventListener('click', function()
{
    removeTable('generatedBsTable');
})

buttonToShowCFTable.addEventListener('click' , function ()
{
    cashFlowRadioValue = document.forms.cashFlowRadio.cashFlowRadioName.value
    
    let http = new XMLHttpRequest();

    http.open('GET' , "https://www.alphavantage.co/query?function=CASH_FLOW&symbol=" + companySymbol + "&apikey=" + apiKeySmmbonvalot);
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            cashFlowInfo = JSON.parse(http.responseText);
            createTableFromObject(cashFlowInfo[cashFlowRadioValue][0] , 'generatedCfTable' , cashFlowTable)
        }
    }
})

removeCfTable.addEventListener('click', function()
{
    removeTable('generatedCfTable');
})

function changeLogoImage(str)
{ 
    
    str = str.replace(/\s/g, '')

    companyImageLink.src = "https://logo.clearbit.com/" + str + ".com"
    
    companyImageLink.addEventListener("error" , function ()
    { 
        searchedName.innerHTML = "Sorry, we could not find  a logo with that name"
    })
}

function getIncomeStatementInfo(companySymbol, requiredInfo , selectedValue)
{
    let http = new XMLHttpRequest();

    http.open('GET' , "https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=" + companySymbol + "&apikey=" + apiKeySmmbonvalot);
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            let incomeStatementInfo = JSON.parse(http.responseText);
            document.getElementById('IncomeStatementSelectedValue').innerHTML = 'O valor de ' + reqInfoIncomeStatementOptions + ' é ' + JSON.stringify(incomeStatementInfo[incomeStatementRadioValue][0][reqInfoIncomeStatementOptions]) + ' .';
    
        }
    }
}

function getBalanceSheetInfo(companySymbol, requiredInfo , selectedValue)
{
    let http = new XMLHttpRequest();

    http.open('GET' , "https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=" + companySymbol + "&apikey=" + apiKeySmmbonvalot);
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            let balanceSheetInfo = JSON.parse(http.responseText);
            document.getElementById('balanceSheetSelectedValue').innerHTML = 'O valor de ' + reqInfoBalanceSheetOptions + ' é ' + JSON.stringify(balanceSheetInfo[balanceSheetRadioValue][0][reqInfoBalanceSheetOptions]) + ' .';
        }
    }
}

function getCashFlowInfo(companySymbol, requiredInfo , selectedValue)
{
    let http = new XMLHttpRequest();

    http.open('GET' , "https://www.alphavantage.co/query?function=CASH_FLOW&symbol=" + companySymbol + "&apikey=" + apiKeySmmbonvalot);
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            cashFlowInfo = JSON.parse(http.responseText);
            document.getElementById('cashFlowSelectedValue').innerHTML = 'O valor de ' + reqInfoCashFlowOptions + ' é ' + JSON.stringify(cashFlowInfo[cashFlowRadioValue][0][reqInfoCashFlowOptions]) + ' .';
        }
    }
}


var ctx = document.getElementById('myChart').getContext('2d');
let arrayOfMonths = [];
let arrayOfPricePerMonth = [];

let arrayOfDays = [];
let arrayOfPricePerDay = [];

function objectForChart()
{
    let http = new XMLHttpRequest();

    http.open('GET' , 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=' + companySymbol + '&apikey=' + apiKeySmmbonvalot);
    http.send();
    http.onreadystatechange = function() 
    {
        if (http.readyState == XMLHttpRequest.DONE) 
        {
            let responseObject = JSON.parse(http.response);
            for(let month in responseObject['Monthly Time Series'] )
            {
                arrayOfMonths.push(month);
                arrayOfPricePerMonth.push(responseObject['Monthly Time Series'][month]['4. close']);
            }
        }
    }
}

    function displayChart(x, y)
    {   
        let numeroDeMeses = arrayOfMonths.slice(x,y)
        let precoDosMeses = arrayOfPricePerMonth.slice(x,y)
        let chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: numeroDeMeses.reverse(),
                datasets: [{
                    label: searchBar.value + ' (Close Price of the Month)',
                    backgroundColor: 'rgba(17, 141, 69, 0.8)',
                    borderColor: 'black',
                    data: precoDosMeses.reverse(),
                }]
            },
            options: {}
        });
    }

    let chartTimePeriodButtons = document.getElementById('chartTimePeriodButtons').children

    for(let x = 0; x < chartTimePeriodButtons.length; x++) 
    {
        chartTimePeriodButtons[x].addEventListener("click" , function(event)
        {

            if (event.target.innerText == '1 Day')
               console.log('Work here later')
            else if (event.target.innerText == '5 Day')
                displayDailyChart(0, 5)
            else if (event.target.innerText == '1 Month')
                displayDailyChart(0, 30)
            else if(event.target.innerText == '3 Month')
                displayDailyChart(0, 90)
            else if(event.target.innerText == '1 Year')
                displayChart(0, 12)
            else if(event.target.innerText == '5 Year')
                displayChart(0, 60)
        })
    }

    function displayDailyChart(x, y)
    {   
        let http = new XMLHttpRequest();

        http.open('GET' , 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+ companySymbol + '&apikey=' + apiKeySmmbonvalot);
        http.send();
        http.onreadystatechange = function() 
        {
            if (http.readyState == XMLHttpRequest.DONE) 
            {
                let responseObject = JSON.parse(http.response);

                for(let day in responseObject['Time Series (Daily)'] )
                {
                    arrayOfDays.push(day);
                    arrayOfPricePerDay.push(responseObject['Time Series (Daily)'][day]['4. close']);
                }
            console.log('This is the displayDailyChart function');
            //displayChart();
            }
        }
    
        let numeroDeDias = arrayOfDays.slice(x,y)
        let precoDosDias = arrayOfPricePerDay.slice(x,y)
        let chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
        
            // The data for our dataset
            data: {
                labels: numeroDeDias.reverse(x , y),
                datasets: [{
                    label: searchBar.value + ' (Closing Price of the day)',
                    backgroundColor: 'rgba(17, 141, 69, 0.8)',
                    borderColor: 'black',
                    data: precoDosDias.reverse(x, y),
                }]
            },
        
            // Configuration options go here
            options: {}
        });
    
    }



function getPressRelease()
{
    let pressReleaseObject;

    let pressReleasesTitle = document.getElementById('pressReleaseTitle');
    let publishedDate = document.getElementById('publishedDate');

    let pressReleasesTitle2 = document.getElementById('pressReleaseTitle2');
    let publishedDate2 = document.getElementById('publishedDate2');

    let pressReleasesTitle3 = document.getElementById('pressReleaseTitle3');
    let publishedDate3 = document.getElementById('publishedDate3');

    let pressReleaseTitle_4 = document.getElementById('pressReleaseTitle_4');
    let publishedDate_4 = document.getElementById('publishedDate_4');

    let pressReleasesTitle_5 = document.getElementById('pressReleaseTitle_5');
    let publishedDate_5 = document.getElementById('publishedDate_5');

    let pressReleaseContent = document.getElementById('pressReleaseContent');
    let pressReleaseContentButton = document.getElementById('pressReleaseContentButton')
    
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://seeking-alpha.p.rapidapi.com/press-releases/list?id="+ companySymbol + "&until=0&size=10");
    xhr.setRequestHeader("x-rapidapi-key", "9376885f11msh877c925bce2ac1ep1bc7e9jsnf2fba18f7946");
    xhr.setRequestHeader("x-rapidapi-host", "seeking-alpha.p.rapidapi.com");
    xhr.send();
    xhr.addEventListener("readystatechange", function() 
        {
	        if (this.readyState === this.DONE)
		        pressReleaseObject = JSON.parse(this.responseText);
                pressReleasesTitle.innerText = pressReleaseObject['data'][0]['attributes']['title'];
                publishedDate.innerText = 'Publish date : ' + pressReleaseObject['data'][0]['attributes']['publishOn'];
                pressReleasesTitle2.innerText = pressReleaseObject['data'][1]['attributes']['title'];
                publishedDate2.innerText = 'Publish date : ' + pressReleaseObject['data'][1]['attributes']['publishOn'];
                pressReleasesTitle3.innerText  = pressReleaseObject['data'][2]['attributes']['title'];
                publishedDate3.innerText  = 'Publish date : ' + pressReleaseObject['data'][2]['attributes']['publishOn'];
                pressReleaseTitle_4.innerText  = pressReleaseObject['data'][3]['attributes']['title'];
                publishedDate_4.innerText  = 'Publish date : ' + pressReleaseObject['data'][3]['attributes']['publishOn'];
                pressReleasesTitle_5.innerText  = pressReleaseObject['data'][4]['attributes']['title'];
                publishedDate_5.innerText  = 'Publish date : ' + pressReleaseObject['data'][4]['attributes']['publishOn'];
        });


    pressReleaseContentButton.addEventListener('click' , function()
    {
        let pressReleaseID = pressReleaseObject['data'][0]['id'];
        

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.addEventListener("readystatechange", function () 
        {
	        if (this.readyState === this.DONE) 
            {
		        let pressReleaseContentResponse = JSON.parse(this.responseText);
                pressReleaseContent.innerHTML = pressReleaseContentResponse['data']['attributes']['content'];
	        }
        });

        xhr.open("GET", "https://seeking-alpha.p.rapidapi.com/press-releases/get-details?id=" + pressReleaseID);
        xhr.setRequestHeader("x-rapidapi-key", "9376885f11msh877c925bce2ac1ep1bc7e9jsnf2fba18f7946");
        xhr.setRequestHeader("x-rapidapi-host", "seeking-alpha.p.rapidapi.com");
        xhr.send();
    })

    let pressReleaseContentButton2 = document.getElementById('readMoreButton');

    pressReleaseContentButton2.addEventListener('click' , function()
    {
        let pressReleaseID2 = pressReleaseObject['data'][1]['id'];

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.addEventListener("readystatechange", function () 
        {
	        if (this.readyState === this.DONE) 
            {
		        let pressReleaseContentResponse = JSON.parse(this.responseText);
                document.getElementById('pressReleaseContent2').innerHTML = pressReleaseContentResponse['data']['attributes']['content'];
	        }
        });

        xhr.open("GET", "https://seeking-alpha.p.rapidapi.com/press-releases/get-details?id=" + pressReleaseID2);
        xhr.setRequestHeader("x-rapidapi-key", "9376885f11msh877c925bce2ac1ep1bc7e9jsnf2fba18f7946");
        xhr.setRequestHeader("x-rapidapi-host", "seeking-alpha.p.rapidapi.com");
        xhr.send();
    })

    let pressReleaseContentButton3 = document.getElementById('readMoreButton3');

    pressReleaseContentButton3.addEventListener('click' , function()
    {
        let pressReleaseID3 = pressReleaseObject['data'][2]['id'];

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.addEventListener("readystatechange", function () 
        {
	        if (this.readyState === this.DONE) 
            {
		        let pressReleaseContentResponse = JSON.parse(this.responseText);
                document.getElementById('pressReleaseContent3').innerHTML = pressReleaseContentResponse['data']['attributes']['content'];
	        }
        });

        xhr.open("GET", "https://seeking-alpha.p.rapidapi.com/press-releases/get-details?id=" + pressReleaseID3);
        xhr.setRequestHeader("x-rapidapi-key", "9376885f11msh877c925bce2ac1ep1bc7e9jsnf2fba18f7946");
        xhr.setRequestHeader("x-rapidapi-host", "seeking-alpha.p.rapidapi.com");
        xhr.send();
    })

    let pressReleaseContentButton4 = document.getElementById('readMoreButton4');

    pressReleaseContentButton4.addEventListener('click' , function()
    {
        let pressReleaseID4 = pressReleaseObject['data'][3]['id'];

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open("GET", "https://seeking-alpha.p.rapidapi.com/press-releases/get-details?id=" + pressReleaseID4);
        xhr.setRequestHeader("x-rapidapi-key", "9376885f11msh877c925bce2ac1ep1bc7e9jsnf2fba18f7946");
        xhr.setRequestHeader("x-rapidapi-host", "seeking-alpha.p.rapidapi.com");
        xhr.send();
        xhr.addEventListener("readystatechange", function () 
        {
	        if (this.readyState === this.DONE) 
            {
		        let pressReleaseContentResponse = JSON.parse(this.responseText);
                document.getElementById('pressReleaseContent_4').innerHTML = pressReleaseContentResponse['data']['attributes']['content'];
	        }
        });
    })

    let pressReleaseContentButton5 = document.getElementById('readMoreButton5');

    pressReleaseContentButton5.addEventListener('click' , function()
    {
        let pressReleaseID5 = pressReleaseObject['data'][4]['id'];

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open("GET", "https://seeking-alpha.p.rapidapi.com/press-releases/get-details?id=" + pressReleaseID5);
        xhr.setRequestHeader("x-rapidapi-key", "9376885f11msh877c925bce2ac1ep1bc7e9jsnf2fba18f7946");
        xhr.setRequestHeader("x-rapidapi-host", "seeking-alpha.p.rapidapi.com");
        xhr.send();
        xhr.addEventListener("readystatechange", function () 
        {
	        if (this.readyState === this.DONE) 
            {
		        let pressReleaseContentResponse = JSON.parse(this.responseText);
                document.getElementById('pressReleaseContent_5').innerHTML = pressReleaseContentResponse['data']['attributes']['content'];
	        }
        });
    })

}


function getCalendar()
{

  let datasCSV;
  let http = new XMLHttpRequest();

  http.open('GET' , "https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&symbol=" + companySymbol + "&horizon=12month&apikey=" + apiKeySmmbonvalot);
  http.send();
  http.onreadystatechange = function() 
    {
      if (http.readyState == XMLHttpRequest.DONE) 
        {
            datasCSV = (http.responseText);
            datasJSON = CSVtoJSON(datasCSV); //converting received CSV to an array of Objects
            push();
        }
    }
}

function push()
{
     
    for ( let i= 0; i < datasJSON.length; i++)
    {
        obj.reportDateArray.push(datasJSON[i]['reportDate']);
        obj.fiscalDateEndingArray.push(datasJSON[i]['fiscalDateEnding']);
    }
    rendering()
}

function rendering() 
  {
    // page is ready
    $('#calendar').fullCalendar({
        // calendar properties
        events: 
        [
            {
                title  : 'TODAY',
                start  : new Date(),
                display : 'block',
                color : 'rgba(17, 141, 69, 0.9)',
                textColor : 'black',
              },
            {
                title  : 'Report Date',
                start  : obj.reportDateArray[0],
                display : 'block',
                color : 'rgba(17, 141, 69, 0.9)',
                textColor : 'black',
              },
              {
                title  : 'Report Date',
                start  : obj.reportDateArray[1],
                display : 'block',
                color : 'rgba(17, 141, 69, 0.9)',
                textColor : 'black',
              },
              {
                title  : 'Report Date',
                start  : obj.reportDateArray[2],
                color : 'rgba(17, 141, 69, 0.9)',
                textColor : 'black',
              },
              {
                title  : 'Fiscal Date Ending',
                start  : obj.fiscalDateEndingArray[0],
                color : 'rgba(17, 141, 69, 0.9)',
                textColor : 'black',
              },
              {
                title  : 'Fiscal Date Ending',
                start  : obj.fiscalDateEndingArray[1],
                color : 'rgba(17, 141, 69, 0.9)',
                textColor : 'black',
              },
              {
                title  : 'Fiscal Date Ending',
                start  : obj.fiscalDateEndingArray[2],
                color : 'rgba(17, 141, 69, 0.9)',
                textColor : 'black',
                fontSize : '12px'
              },
        ]
    })
  }
