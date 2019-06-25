let answerId;
const baseURL = "http://localhost:8080";

//将页面URL转化为answerId
function getID(){
    let thisURL = window.location.href;
    answerId = (thisURL.split("?")[1]).split("=")[1];
}
getID();

function getAnswers() {

    //获取当前id answer的question 和answer 信息
        fetch(baseURL+"/question",{
        method:'post',
        headers: {
            'content-type': 'application/json'
        },
        body:"answerId="+answerId
    }).then(response=>{
        if (response.ok){
            console.log("阅读全文请求成功！");
            return response.json();
        }
    }).then(res=>{
        //后端传来的数据是data后面一个string
        let pageCardDescription = document.getElementById("pageCardDescription"+answerId);
        pageCardDescription.innerHTML = res.data;
    }).catch(function(e){
        alert("error:" + e);
    });

}