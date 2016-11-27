/**
 * Created by Carmine on 01.11.2016.
 */

class Services {
    constructor() {
        this.name = "service";

    }

    doSomething() {
        console.log("I'm " + this.name);
    }

    // XMLHttpRequest

    encodeValue(val)
{
    var encodedVal;
    if (!encodeURIComponent)
    {
        encodedVal = escape(val);
        /* fix the omissions */
        encodedVal = encodedVal.replace(/@/g, '%40');
        encodedVal = encodedVal.replace(/\//g, '%2F');
        encodedVal = encodedVal.replace(/\+/g, '%2B');
    }
    else
    {
        encodedVal = encodeURIComponent(val);
        /* fix the omissions */
        encodedVal = encodedVal.replace(/~/g, '%7E');
        encodedVal = encodedVal.replace(/!/g, '%21');
        encodedVal = encodedVal.replace(/\(/g, '%28');
        encodedVal = encodedVal.replace(/\)/g, '%29');
        encodedVal = encodedVal.replace(/'/g, '%27');
    }
    /* clean up the spaces and return */
    return encodedVal.replace(/\%20/g,'+');
}

    createXHR()
{
    try { return new XMLHttpRequest(); } catch(e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch (e) {}
    try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
    try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}

    return null;
}


    sendRequest(url, noteData)
{
    var xhr = this.createXHR();

    if (xhr)
    {
        xhr.open("POST",url,true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function(){app.service.handleResponse(xhr);};
        xhr.send(noteData);
    }

}

    handleResponse(xhr)
{
    if (xhr.readyState == 4  && xhr.status == 200)
    {
        var responseOutput = document.getElementById("responseOutput");
        //responseOutput.innerHTML = xhr.responseText;

        var response = JSON.parse(xhr.responseText);
        responseOutput.innerHTML ='<p><b>Server response:</b></p><p> Titel: <i>' + response.title + '</i>&nbsp' +
            'Content: <i>' + response.content + '</i>&nbsp' +
            'Importance level: <i>' + response.importance + '</i>&nbsp' +
            'Due date: <i>' + response.dueDate + '</i></p>';



    }
}






     makeData(title, inhalt, importance, dueDate )
{


    var url = "/add";
    var noteData = "title=" + this.encodeValue(title) + "&inhalt=" + this.encodeValue(inhalt) +
        "&importance=" + this.encodeValue(importance) + "&dueDate=" + this.encodeValue(dueDate);

    this.sendRequest(url, noteData);

    /* kill form submission */
    return false;
}



}
