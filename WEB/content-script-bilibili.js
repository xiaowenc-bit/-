var Cont = ["TimeStamp","Title", "Mime Type","Player Type","Resolution","Video DataRate","Audio DataRate","Segments","Dropped Frames","Video Host","Audio Host","Video Speed","Audio Speed","Network Activity"];

let data = [];
let variable = 'Y';
var headers = ["TimeStamp","Title", "Mime Type Video","Mime Type Audio","Player Type","Resolution","Video DataRate","Audio DataRate","Segments","Dropped Frames","Video Host","Audio Host","Video Speed","Audio Speed","Network Activity"];

async function fetchVideoTitles() {
    console.log("In");


    for(var i = 1; i <= 100000; i++){
    const videoElements = document.querySelectorAll("div#viewbox_report.video-info-container.report-wrap-module.report-scroll-module");
    const Type = [];


    var MimeTypeElements = document.querySelectorAll("div.info-line");

    while(MimeTypeElements.length == 0){
        await sleep(300);
        MimeTypeElements = document.querySelectorAll("div.info-line");
    }
    var Time = timestampToSystemTime(new Date().getTime());
    Type.push(Time);
    Type.push(videoElements[0].querySelector("h1.video-title").innerText);
    for (let i = 0; i < 12 ; i++){
        Type.push(MimeTypeElements[i].innerText.replace(Cont[i + 2] + ':', '').trim());
    }
    data.push(Type);
    await sleep(500);
    //console.log(i);

    }
}
fetchVideoTitles();

window.onbeforeunload = function() {
    const csvContent = headers.join(",") + "\n" + data.map(row =>row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'video_data_bilibili.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
};



async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function timestampToSystemTime(timestamp) {
    const date = new Date(timestamp);
    const systemTime = date.toISOString();
    return systemTime;
}