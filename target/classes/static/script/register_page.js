const URL = 'http://localhost:8080/register/load';

function user_register() {
    let userName = document.getElementById('inputUserName').value;
    let nickName = document.getElementById('inputNickName').value;
    let password = document.getElementById('inputPassword').value;
    let repeatPassword = document.getElementById('inputRepeatPassword').value;

    let register_info = {
        userUserName : userName,
        userNickName : nickName,
        userPassword : password
    };

    console.log(register_info);

    if(userName === ""||nickName === ""||password === ""||repeatPassword===""){
        alert("请输入完整!");
    }else if(password!==repeatPassword){
        alert("两次输入密码不一致！");
    }else{
        fetch(URL,{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(register_info)
        }).then(response =>{
            if(response.ok){
                console.log("请求成功");
                return response.text();
            }
        }).then(data => {
            if(data === "success"){
                alert("注册成功！");
                location.href="zhifou_main.html";
            }else if(data === "failed"){
                alert("该用户命已存在！注册失败");
                return false;
            }
        }).catch(function(e){
            alert("error:" + e);
        });
    }
}

function switch_state() {
    let register_part = document.getElementById("register_state");
    let login_state = document.getElementById("login_state");
    if (register_part.style.display === "block"){
        register_part.style.display = "none";
        login_state.style.display = "block";
    }else{
        register_part.style.display = "block";
        login_state.style.display = "none";
    }
}

function user_login() {
    let userName = document.getElementById("inputUserName_load").value;
    let password = document.getElementById("inputPassword_load").value;

    let login_info = {
        userUserName : userName,
        userPassword : password
    };

    console.log(login_info);

    if( userName === "" || password === ""){
        alert("请输入完整!");
        //需要另外对字符串键入匹配
    }else{
        fetch(URL,{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(login_info)
        }).then(response =>{
            if(response.ok){
                console.log("请求成功");
                return response.text();
            }
        }).then(data => {
            if(data === "success"){
                alert("登陆成功！");
                location.href="zhifou_main.html";
            }else if(data === "failed"){
                alert("该用户命不存在或者密码输入错误！");
                return false;
            }
        }).catch(function(e){
            alert("error:" + e);
        });
    }
}