export {createTable , addRowToTable, addHeaderToRow, addDataToRow, removeTable, createTableFromObject}


function createTable(id , appendToThisElement)
{
    let table = document.createElement("table");
    table.id = id;
    table.style = "border : 1px solid rgb(17, 141, 69, 0.7)"
    appendToThisElement.appendChild(table);
    console.log('Created table, appended to the element given.')
}


let addRowToTable = function(tableId , UserInput)
{
    let tableRow = document.createElement("tr");
    tableRow.id = UserInput;
    document.getElementById(tableId).appendChild(tableRow);
    console.log('Created row, and appended it to the table')
}

let addHeaderToRow = function ( rowId , header)
{
    let th = document.createElement("th");
    th.innerText = header;
    th.style = "border : 1px solid black"
    document.getElementById(rowId).appendChild(th);
    console.log('Created header, appended to the row')

}

let addDataToRow = function( rowId , data)
{
    let td = document.createElement("td");
    td.innerText = data;
    td.style = "border : 1px solid black"
    document.getElementById(rowId).appendChild(td);
    console.log('Added data to the row')
}


let removeTable = function(tableID)
{
    document.getElementById(tableID).remove();
    
    console.log(' A tabela com o ID "' + tableID + '" foi removida.')
}

function createTableFromObject(object , tableId , appendToThisElement)
{
    createTable(tableId , appendToThisElement)
    
    let i = 0;
    for ( let element in object)
    {
        addRowToTable(tableId , element);
        addHeaderToRow(element, element);
        addDataToRow(element, Object.values(object)[i]);

        i++;
    }
}

