var body = String($response.body);
body = body.replace(/<script.*>.*<\/script>/g,"");
console.log(body);
$done({ body });
