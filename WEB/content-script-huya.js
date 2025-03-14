let data = [];
let variable = 'Y';
var headers = ["TimeStamp","Title", "Start Time","Player Version","Video Resolution","Video Bitrate","Frame Rate","Video Coding","Video Delay","Speed","Line"];

async function fetchVideoTitles() {
    //await sleep(5000);

    for(var i = 1; i <= 100000; i++){
    const Type = [];

    var ElementType = document.querySelectorAll('div > p > em');
    while(ElementType.length === 0){
        await sleep(300);
        ElementType = document.querySelectorAll('div > p > em');
    }

    var Time = timestampToSystemTime(new Date().getTime());
    Type.push(Time);

    var title = document.querySelector('[class="host-title"]');
    Type.push(title.innerHTML + " ");

    for(var i = 0; i < 9; i++){
        Type.push(ElementType[i].innerHTML + " ");
    }

    data.push(Type);
    await sleep(500);


    //console.log(Type);
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
    a.download = 'video_data_huya.csv';
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