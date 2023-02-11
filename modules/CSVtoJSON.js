export {CSVtoJSON}

//CSV file with headers
function CSVtoJSON(csv){

    var linhas=csv.split("\n");
  
    var result = [];
  
    var headers=linhas[0].split(",");
  
    for(var i=1;i<linhas.length;i++){
  
        var obj = {};
        var currentline=linhas[i].split(",");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
    
    //return result; //JavaScript object
    return result;
  }