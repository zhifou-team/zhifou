let UrlAnswerId;

//将页面URL转化为answerId
function getID(){
    let thisURL = window.location.href;
    UrlAnswerId = (thisURL.split("?")[1]).split("=")[1];
}
getID();

function displayAnswers(answers){

    let htmlAnswersString = '';
    answers.forEach(data =>{
        htmlAnswersString += `
            <div class="answer-card">
                    <a class="answer-top" id="answer-top${data.answerId}"></a>
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
                    <div class="answer-time">${data.updateTime}</div>
                    <div class="question-card-bottom" style="position: relative;bottom: 0" id="question-card-bottom${data.answerId}">
                        <div class="page-card-bottom-reader" style="display: inline-block" onclick="cardOperation('upQuestionLooking',${data.answerId})" id="upQuestionLooking${data.answerId}">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>在看&nbsp</span><span id="isLooking${data.answerId}">${data.answerStar}</span>
                            </div>
                        </div>
                        <div class="page-card-bottom-reader-already" style="display: none" onclick="cardOperation('downQuestionLooking',${data.answerId})" id="downQuestionLooking${data.answerId}">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-reading" style="font-size: 18px;line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>已在看</span><span id="haveLooked${data.answerId}">${data.answerStar}</span>
                            </div>
                        </div>
                        <div class="page-card-bottom-item" onclick="cardOperation('displayComment',${data.answerId})" data-toggle="modal" data-target="#displayComment">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-pinglun" style="line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span>${data.commentNumber} 条评论</span>
                            </div>
                        </div>
                        <div class="page-card-bottom-item" onclick="cardOperation('shareQuestion',${data.answerId})">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-fenxiang" style="font-size: 18px;line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span style="display: inline-block" id="shareQuestion${data.answerId}">分享</span>
                                <span style="display: none" id="haveShared${data.answerId}">已分享</span>
                            </div>
                        </div>
                        <div class="page-card-bottom-item" onclick="cardOperation('storeQuestion',${data.answerId})">
                            <div class="d-inline-block align-middle">
                                <span class="iconfont icon-shoucang" style="font-size: 18px;line-height: 22px"></span>
                            </div>
                            <div class="d-inline-block align-middle">
                                <span style="display: inline-block" id="storeQuestion${data.answerId}">收藏</span>
                                <span style="display: none" id="haveStored${data.answerId}">已收藏</span>
                            </div>
                        </div>
                        <div class="page-card-bottom-pickup-answer" style="display: none" onclick="answerOpeartion('pickUpAnswer',${data.answerId})" id="pickUp-answer${data.answerId}">
                            <div>
                                <a href="#answer-top${data.answerId}"><span>收起全文 </span><span class="iconfont icon-shang"></span></a>
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

        let firstRequest = {
            answerId : UrlAnswerId,
            count : 0
        };

        //获取当前id answer的question 和answer 信息
        fetch(
            // baseURL+"/content",
            baseURL+"/question/full",
            {
            method:'post',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(firstRequest)

        }
        ).then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{

            //写入问题头 和右侧的 作者information
            document.getElementById("question-title").innerText = res.data.questionTitle;
            document.getElementById("question-description").innerText = res.data.questionDescription;
            document.getElementById("question-followers").innerText = res.data.questionFollowers;
            document.getElementById("question-browser").innerText = res.data.questionBrowsers;
            document.getElementById("question-container").style.display = "block";

            document.getElementById("about-author-img").src = res.data.answerInfoList[0].userImageUrl;
            document.getElementById("about-author-name").innerText = res.data.answerInfoList[0].userNickname;
            document.getElementById("about-author-description").innerText = res.data.answerInfoList[0].userDescription;


            let answerList;
            answerList = res.data.answerInfoList;
            //对显示数量及数据是否为空进行判断限制
            displayAnswers(answerList);
            //display之后对answerDescription的长度进行判断

            //插入更多问题
            insertMoreAnswer();
            //cards插入完成后，显示导航栏下方右侧部分
            document.getElementById("right-columns").style.display = "block";

        }).then(()=>{

            //将querySelectorAll选择出的nodelist转化为数组
            let contents = Array.prototype.slice.call(document.querySelectorAll(".description-content"));
            judgeAnswerHeight(contents);

        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    }else if (type === "moreLoad"){

        let answerNum = document.querySelectorAll(".answer-card").length;

        let moreRequest = {
            answerId : UrlAnswerId,
            count : answerNum
        };

        //获取当前id answer的question 和answer 信息
        fetch(baseURL+"/question/full",{
            method:'post',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify(moreRequest)
        }).then(response=>{
            if (response.ok){
                return response.json();
            }
        }).then(res=>{

            let answerList = res.data.answerInfoList;
            let newCocntentNum = answerList.length;
            if (newCocntentNum !== 0){
                //对显示数量及数据是否为空进行判断限制
                displayAnswers(answerList);

            } else if( newCocntentNum === 0){

                document.getElementById("answer-card-more").innerText = "我已经到底了噢";
                zhiFouAlert("没有更多回答了");

            }
            return newCocntentNum;

        }).then(num=>{

            //将querySelectorAll选择出的nodelist转化为数组; 在刷出来之后判断；
            let moreContents = Array.prototype.slice.call(document.querySelectorAll(".description-content"),-num);
            judgeAnswerHeight(moreContents);

        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });
    }
}

function answerOpeartion(type,answerId) {
    if (type === "displayFullAnswer") {
        document.getElementById("answer-shadow"+answerId).style.display = "none";
        document.getElementById("answer-description"+answerId).style.height = "auto";
        document.getElementById("pickUp-answer"+answerId).style.display = "inline-block";

        document.getElementById("question-card-bottom"+answerId).style.position = "sticky";
    } else if (type === "pickUpAnswer") {
        document.getElementById("pickUp-answer"+answerId).style.display = "none";
        document.getElementById("answer-description"+answerId).style.height = "450px";
        document.getElementById("answer-shadow"+answerId).style.display = "block";

        document.getElementById("question-card-bottom"+answerId).style.position = "relative";
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
                        <div class="answer-card-more" id="answer-card-more">
                            <span>点击查看更多回答</span>
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                        </div>
                </div>
            `;
    moreAnswer.innerHTML = htmlReadMoreHTML;
    insertDiv.parentNode.insertBefore(moreAnswer,insertDiv.nextSibling);
}