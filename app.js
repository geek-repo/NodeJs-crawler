const rp=require('request-promise')
let url_list=['https://google.com/'];


async function crawl(url){
console.log("\x1b[32m","================SCANNING:-",url," ====================")
const options = {
    url: url,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36'
    }
};

await rp(options,url, {timeout: 500})
    .then(function(out){parser(out)})
    .catch(function(err){return 0;});
}


async function parser(dump)
{
let re=new RegExp('[http?https]+:\/\/+[a-zA-Z0-9]\w.*\"',"g"); //global 'g' variable was the solution
let remover=new RegExp('".*')
let xArray;
while(xArray = re.exec(dump)){

  var final=xArray[0].replace(remover,"")
  if (final.length>170){continue;}

  if (url_list.indexOf(final)>=0)
  {
    continue;
  }
  else{

    url_list.push(final)
  }
  console.log("\x1b[33m",final);

    }

}

async function main()
{
  var i=0
while(1)
 {
  try {
    if (typeof url_list[i] !== 'undefined')
    {
    await crawl(url_list[i]);
    i=i+1;}else{console.log("\x1b[37m","\n---------ENTER A PROPER URL---------");return false;}
  } catch (e) {
    return false;
  }

 }

}

main()
