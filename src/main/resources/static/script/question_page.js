let answerId;

//将页面URL转化为answerId
function getID(){
    let thisURL = window.location.href;
    answerId = (thisURL.split("?")[1]).split("=")[1];
}
getID();

function displayAnswers(answers){

    let htmlAnswersString = '';
    answers.forEach(data =>{
        htmlAnswersString += `
            <div class="answer-card">
                    <div class="answer-card-author">
                        <div style="display: inline-block;vertical-align: middle">
                            <img src="${data.userImageUrl}" width="48" height="48" class="answer-card-author-img">
                        </div>
                        <div class="author-info">
                            <div class="author-name">
                                <span>${data.userNickname}</span>
                            </div>
                            <div class="author-description">
                                <span>${data.userDescription}</span>
                            </div>
                        </div>
                    </div>
                    <div class="answer-star">${data.answerStar} 人在看</div>
                    <hr>
                    <div class="answer-description" id="answer-description${data.answerId}" style="height: auto">
                        <div class="description-content" id="content${data.answerId}">${data.answerDescription}</div>
                        <div class="answer-shadow" style="display: none" id="answer-shadow${data.answerId}">
                            <div class="answer-shadow-text" onclick="answerOpeartion('displayFullAnswer',${data.answerId})">
                                <span>点击展开全文</span><span class="iconfont icon-xia"></span>
                            </div>
                        </div>
                    </div>
                    <div class="answer-time">最近编辑于 2019-06-24</div>
                    <div class="question-card-bottom">
                        <div class="page-card-bottom-reader" style="display: inline-block" onclick="cardOperation('upQuestionLooking',${data.answerId})" id="upQuestionLooking${data.answerId}">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>在看&nbsp</span><span id="isLooking${data.answerId}">${data.answerStar}</span>
                            </div>
                        </div>
                        <div class="page-card-bottom-reader" style="display: none" onclick="cardOperation('downQuestionLooking',${data.answerId})" id="downQuestionLooking${data.answerId}">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>已在看</span><span id="haveLooked${data.answerId}">${data.answerStar}</span>
                            </div>
                        </div>
                        <div class="page-card-bottom-item" onclick="cardOperation('displayComments',${data.answerId})">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-pinglun" style="line-height: 16px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span style="display: inline-block" id="downComment${data.answerId}">${data.comment} 条评论</span>
                                <span style="display: none" id="UpComment${data.answerId}">收起评论</span>
                            </div>
                        </div>
                        <div class="page-card-bottom-item" onclick="cardOperation('shareQuestion',${data.answerId})">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-fenxiang" style="font-size: 18px;line-height: 18px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span style="display: inline-block" id="shareQuestion${data.answerId}">分享</span>
                                <span style="display: none" id="haveShared${data.answerId}">已分享</span>
                            </div>
                        </div>
                        <div class="page-card-bottom-item" onclick="cardOperation('storeQuestion',${data.answerId})">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 18px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span style="display: inline-block" id="storeQuestion${data.answerId}">收藏</span>
                                <span style="display: none" id="haveStored${data.answerId}">已收藏</span>
                            </div>
                        </div>
                        <div class="page-card-bottom-pickup-answer" style="display: none" onclick="answerOpeartion('pickUpAnswer',${data.answerId})" id="pickUp-answer${data.answerId}">
                            <div>
                                <span>收起全文 </span><span class="iconfont icon-shang"></span>
                            </div>
                        </div>
                    </div>
                </div>
                `;
    });

    //将question cards插入到answerInsert这个div之前
    let insertDiv = document.getElementById("answerInsert");
    let answerCards = document.createElement("div");
    answerCards.className = "answer-card-container";
    answerCards.innerHTML = htmlAnswersString;
    insertDiv.parentNode.insertBefore(answerCards,insertDiv);
}

function getAnswers(type) {

    function judgeAnswerHeight(answerList){

        //插入之后对question_description长度进行判断
        answerList.forEach(des=>{
            if (des.clientHeight > 450){
                //大于450的内容将div设置为450px高
                let answerId = des.id.substring(7);
                document.getElementById("answer-description"+answerId).style.height = "450px";
                document.getElementById("answer-shadow"+answerId).style.display = "block";
            }
        });

    }

    if(type === "firstLoad"){

        //获取当前id answer的question 和answer 信息
        fetch(baseURL+"/content",{

            method:'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            body:"answerId="+answerId

        }).then(response=>{
            if (response.ok){
                console.log("问题页面请求成功！");
                return response.json();
            }
        }).then(res=>{

            //写入问题头 和右侧的 作者information
            document.getElementById("question-title").innerText = res.data.questionTitle;
            document.getElementById("question-description").innerText = res.data.questionDescription;
            document.getElementById("question-followers").innerText = res.data.questionFollowers;
            document.getElementById("question-container").style.display = "block";

            document.getElementById("about-author-img").src = res.data.answerInfoList[0].userImageUrl;
            document.getElementById("about-author-name").src = res.data.answerInfoList[0].userNickname;
            document.getElementById("about-author-description").src = res.data.answerInfoList[0].userDescription;



            let answerList;
            answerList = res.data.answerInfoList;
            //对显示数量及数据是否为空进行判断限制
            displayAnswers(answerList);
            //display之后对answerDescription的长度进行判断

            judgeAnswerHeight(document.querySelectorAll(".description-content"));
            //插入更多问题
            insertMoreAnswer();
            //cards插入完成后，显示导航栏下方右侧部分
            document.getElementById("right-columns").style.display = "block";

        }).catch(function(e){
            alert("error:" + e);
        });

    }else if (type === "moreLoad"){

        let answerNum;
        answerNum = document.querySelectorAll(".answer-card-container").length;

        //获取当前id answer的question 和answer 信息
        fetch(baseURL+"/question/full",{
            method:'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            body:"answerId="+answerId+"count="+answerNum
        }).then(response=>{
            if (response.ok){
                console.log("问题页面请求成功！");
                return response.json();
            }
        }).then(res=>{

            let answerList;
            answerList = res.data.answerInfoList;
            //对显示数量及数据是否为空进行判断限制
            displayAnswers(answerList);
            //对新插入的问题数组进行判断 ; slice用于返回后 10 个数据
            judgeAnswerHeight(document.querySelectorAll(".description-content").slice(-10));

        }).catch(function(e){
            alert("error:" + e);
        });
    }
}

function answerOpeartion(type,answerId) {
    if (type === "displayFullAnswer") {
        document.getElementById("answer-shadow"+answerId).style.display = "none";
        document.getElementById("answer-description"+answerId).style.height = "auto";
        document.getElementById("pickUp-answer"+answerId).style.display = "inline-block";
    } else if (type === "pickUpAnswer") {
        document.getElementById("pickUp-answer"+answerId).style.display = "none";
        document.getElementById("answer-description"+answerId).style.height = "450px";
        document.getElementById("answer-shadow"+answerId).style.display = "block";
    }
}

function insertMoreAnswer() {
    //将查看更多推荐插入最后一个card前面
    let insertDiv = document.getElementById("answerInsert");
    let moreAnswer = document.createElement("div");
    moreAnswer.className = "answer-card-container";
    let htmlReadMoreHTML;
    htmlReadMoreHTML = `
                <div class="question-card-tips" onclick="getAnswers('moreLoad')" id="pageCardMore">
                        <div class="answer-card-more">
                            <span>点击查看更多回答</span>
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </div>
                </div>
            `;
    moreAnswer.innerHTML = htmlReadMoreHTML;
    insertDiv.parentNode.insertBefore(moreAnswer,insertDiv.nextSibling);
    console.log("插入更多答案成功");
}