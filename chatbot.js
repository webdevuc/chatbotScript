// $(document).ready(function(){
//     // alert('Hellooo');
    
//     var styleHtml="<style>body {font-family: Arial, Helvetica, sans-serif;}*{box-sizing: border-box;}.open-button {background-color: #555;color: white;padding: 16px 20px;border: none;cursor: pointer;opacity: 0.8;position: fixed;bottom: 23px;right: 28px;width: 280px;}.chat-popup {display: none;position: fixed;bottom: 0;right: 15px;border: 3px solid #f1f1f1;z-index: 9;}.form-container {max-width: 300px;padding: 10px;background-color: white;}.form-container textarea {width: 100%;padding: 15px;margin: 5px 0 22px 0;border: none;background: #f1f1f1;resize: none;min-height: 200px;}.form-container textarea:focus {background-color: #ddd;outline: none;}.form-container .btn {background-color: #4CAF50;color: white;padding: 16px 20px;border: none;cursor: pointer;width: 100%;margin-bottom:10px;opacity: 0.8;}.form-container .cancel {background-color: red;}.form-container .btn:hover, .open-button:hover {opacity: 1;}</style></body>";
    
//     var chatbotHtml = '<body>'+styleHtml+'<button class="open-button" id="openForm">Chat</button><div class="chat-popup" id="myForm"><form action="" class="form-container"><h1>Chat</h1><label for="msg"><b>Message</b></label><textarea placeholder="Type message.." name="msg" required></textarea><button type="submit" class="btn">Send</button><button type="button" class="btn cancel" id="closeForm">Close</button></form></div>'
    
//     //$("head").append('<link rel="stylesheet" href="./chatbot.css" type="text/css" />');
    
//     $("body").append(chatbotHtml);
    
//     $('body').on('click', '#openForm', function() {
//         $("#myForm").show();
//     })
    
//     $('body').on('click', '#closeForm', function(){
//         $("#myForm").hide();
//     })
// });


$(document).ready(function(){
    // alert('Hellooo');
    
    var styleHtml="<style>body {font-family: Arial, Helvetica, sans-serif;}*{box-sizing: border-box;}.open-button {background-color: #555;color: white;padding: 16px 20px;border: none;cursor: pointer;opacity: 0.8;position: fixed;bottom: 23px;right: 28px;width: 280px;}.chat-popup {display: none;position: fixed;bottom: 0;right: 15px;border: 3px solid #f1f1f1;z-index: 9;}.form-container {max-width: 300px;padding: 10px;background-color: white;}.form-container textarea {width: 100%;padding: 15px;margin: 5px 0 22px 0;border: none;background: #f1f1f1;resize: none;min-height: 200px;}.form-container textarea:focus {background-color: #ddd;outline: none;}.form-container .btn {background-color: #4CAF50;color: white;padding: 16px 20px;border: none;cursor: pointer;width: 100%;margin-bottom:10px;opacity: 0.8;}.form-container .cancel {background-color: red;}.form-container .btn:hover, .open-button:hover {opacity: 1;} input[type=text] {width: 100%;padding: 12px 20px;margin: 8px 0;box-sizing: border-box;}</style></body>";
    
    var chatbotHtml = '<body>'+styleHtml+'<button class="open-button" id="openForm">Chat</button><div class="chat-popup" id="myForm"><form action="" class="form-container"><h1>Chat</h1><textarea readonly="true" id="botChat" ></textarea> <input id="input" type="text" placeholder="Type message.." name="msg" required "><button class="btn" id="send">Send</button><button type="button" class="btn cancel" id="closeForm">Close</button></form></div>'

    $("body").append(chatbotHtml);
    
    $('body').on('click', '#openForm', function() {
        $("#myForm").show();
    })
    
    $('body').on('click', '#closeForm', function(){
        $("#myForm").hide();
    })

    $("#input").keypress(function() {
        // console.log( "Handler for .keypress() called." );
        enterButton(event, document.getElementsByTagName('input')[0].value);
    });

    $("#send").click(function() {
        // alert( "Handler for .click() called." );
        answer(document.getElementsByTagName('input')[0].value);
    });

    var you = "Me";
    // Recognized Speech Patterns for Question Responses
    var Hello = ["HI", "HEY", "HOWDY", "HEYA", "HOLA", "HELLO", "SUP", "KONNICHIWA", "ALOHA"]
    var Goodbye = ["BYE", "SEE YA", "CYA", "LATER", "ADIOS", "SAYONARA", "SEEYA"]
    var Greeting = ["WHAT'S UP", "HOW'S IT GOING", "HOW ARE YOU", "NICE DAY", "GOOD MORNING", "GOOD NIGHT"]
    var Name = [ "WHAT IS YOUR NAME", "WHAT'S YOUR NAME", "WHO ARE YOU", "WHAT DO THEY CALL YOU", "COMO TE LLAMAS"]
    var Actions = ["HELP", "DRINK", "CHALLENGE"]
    var Questions = ["QUESTION", "QUIZ", "CODE", "ANSWER", "HTML", "CSS", "JAVASCRIPT"];
    var HTMLTags1 = ["<P>", "<I>", "<SPAN>", "<DIV>", "<ARTICLE>", "<IFRAME>", "<A>", "<ABBR>","<ADDRESS>","<AUDIO>"];
    var HTMLTags2 = ["<A>", "<ABBR>", "<ACRONYM>", "<ADDRESS>","<APPLET>", "<AREA>","<ARTICLE>","<ASIDE>","<AUDIO>","<B>" ]
    var HTMLTags3 = ["<BASE>","<BASEFONT>","<BDI>","<BDO>","<BIG>","<BLOCKQUOTE>","<BODY>","<BR>","<BUTTON>","<CANVAS>"    ]
    var HTMLTags4 = ["<CAPTION>","<CENTER>","<CITE>","<CODE>","<COL>","<COLGROUP>","<DATALIST>","<DD>","<DEL>","<DETAILS>","<DFN>"]
    var colors = ["BLUE","RED","GREEN","YELLOW","WHITE","BLACK","SILVER","GRAY" ];
    var Else = true;
    var questions = [colors, HTMLTags4, HTMLTags3, HTMLTags2, HTMLTags1, Hello, Goodbye, Greeting, Name, Actions, Questions];
    var reactions=[BotHello, BotGoodbye,BotGreeting];
    var BotHello = ["HI", "HEY", "HOWDY", "HEYA", "HOLA", "HELLO", "SUP", "KONNICHIWA", "ALOHA"]
    var BotGoodbye = ["BYE", "SEE YA", "CYA", "LATER", "ADIOS", "SAYONARA", "SEEYA"]
    var BotGreeting = ["WHAT'S UP", "HOW'S IT GOING", "HOW ARE YOU", "NICE TO SEE YOU", "GOOD MORNING", "WELCOME"]
    var BotPleasant = ["Thanks.", "Good job.", "Cool.", "I see.", "Anyway.", "right-o."]
    //$("head").append('<link rel="stylesheet" href="./chatbot.css" type="text/css" />');

    function answer(x) {
        var botOut = botChat.value;
        document.getElementsByTagName("textarea")[0] = botChat
        //RESPONSES//                           
                    document.getElementsByTagName("input")[0].value = ""
                    if (x.charAt(0).includes("!") === false){
                    youSay(x); botChat.scrollTop = botChat.scrollHeight;
                    } 
                    question = x.toUpperCase()
                    for (i = 0; i < 10; i++) {
                /*          EMPTY RESPONSE          */                    
                    if (question === "" || null) {
                        setTimeout( function() { botSays("\nBot : What? You shy?"); botChat.scrollTop = botChat.scrollHeight;}, 600);
                    return; }
                    /*          COMMAND MENU RESPONSES         */                    
                    else if (question === "!MENU" ) {
                    botSays("\n\n**Commands are !Name yourName, !Bgcolor backgroundColor, !Text textColor, !Menu, !Secrets, !Tutorial, !Botsay textSays, and !Me textDoes,. Play around."); botChat.scrollTop = botChat.scrollHeight;
                    return;
                    }else if (question.slice(0,9).includes("!BGCOLOR ") ) {
                        botSays("\n\n**Changed the background color to " + x.slice(9) ); botChat.scrollTop = botChat.scrollHeight; botChat.style.backgroundColor = x.slice(9);
                    return;
                    } else if (question.slice(0,6).includes("!TEXT ") ) {
                        botSays("\n\n**Changed the text color to " + x.slice(6) ); botChat.scrollTop = botChat.scrollHeight; botChat.style.color = x.slice(6);
                    return;
                    } else if (question.slice(0,6).includes("!NAME ") ) {
                        you = x.slice(6);
                        botSays("\n\n**Your name is " + you); botChat.scrollTop = botChat.scrollHeight;
                    return;
                    } else if (question.slice(0,9).includes("!SECRETS") ) {
                        botSays("\n\n**What? I don't have any secrets. I've got nothing to hide."); botChat.scrollTop = botChat.scrollHeight;
                    return;
                    }
                    else if (question.slice(0,10).includes("!TUTORIAL") ) {
                        botSays("\n\n**What? I don't have a tutorial. Read my code, I'm not going to explain myself."); botChat.scrollTop = botChat.scrollHeight;
                    return;
                    }
                    else if (question.slice(0,10).includes("!BOTSAY") ) {
                        botSays("\nBot : " + x.slice(8)); botChat.scrollTop = botChat.scrollHeight;
                    return;
                    } else if (question.slice(0,4).includes("!ME") ) {
                        youDo(x.slice(4)); botChat.scrollTop = botChat.scrollHeight;
                    return;
                    }
                    /* Questions, Answers and Responses */
                    if (question.includes(Goodbye[i])) {
                        Else = false;
                        setTimeout(botSays, 600, "\
                                     Bot : Godspeed. Leave an upvote?")
                    } else if (question.includes(Name[i])) {
                        Else = false; setTimeout(botSays, 600, "\nBot : My name is BotOne. You can call me tonE.")
                    } else if ( question.includes(HTMLTags1[i]) ) {
                        /*HTML Tag Definitions Courtesy of W3Schools.com*/
                        Else = false; if (HTMLTags1[i] === "<P>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<p>' Defines a paragraph.") } else if (HTMLTags1[i] === "<I>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<i>' Defines a part of text in an alternate voice or mood. Italics.") } else if (HTMLTags1[i] === "<SPAN>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<Span>' Defines a section in a document.") } else if (HTMLTags1[i] === "<A>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<Span>' Defines a section in a document.") }
                    } else if ( question.includes(HTMLTags2[i]) ) {
                        /*HTML Tag Definitions Courtesy of W3Schools.com*/
                        Else = false; if (HTMLTags2[i] === "<ABBR>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<abbr>' Defines an abbreviation or acronym.") } else if (HTMLTags2[i] === "<ACRONYM>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<acronym>' Not supported in HTML5, use '<abbr>' instead.") } else if (HTMLTags2[i] === "<ADDRESS>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<address>' Defines contact information for the author/owner of a document.") } else if (HTMLTags2[i] === "<APPLET>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<applet>' Not supported in HTML5, use '<embed>' or '<object>' instead.") }else if (HTMLTags2[i] === "<AREA>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<area>' Defines an area inside an image map") } else if (HTMLTags2[i] === "<ARTICLE>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<article>' Defines an article.") } else if (HTMLTags2[i] === "<ASIDE>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<aside>' Defines content aside from the page content.") }  else if (HTMLTags2[i] === "<AUDIO>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<audio>' Defines sound content.") } else if (HTMLTags2[i] === "<B>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<B>' Defines bold text.") }
                    } else if ( question.includes(HTMLTags3[i]) ) {
                        Else = false;
                        if (HTMLTags3[i] === "<BASE>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<base>' Specifies the base URL/target for all relative URLs in a document") } else if (HTMLTags3[i] === "<BASEFONT>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<basefont>' Not supported in HTML5. Use CSS instead.  Specifies a default color, size, and font for all text in a document. ") } else if (HTMLTags3[i] === "<BDI>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<bdi>' Isolates a part of text that might be formatted in a different direction from other text outside it. ") } else if (HTMLTags3[i] === "<BDO>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<bdo>' Overrides the current text direction. ") } else if (HTMLTags3[i] === "<BIG>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<big>' Not supported in HTML5, use CSS instead. Defines big text. ") } else if (HTMLTags3[i] === "<BLOCKQUOTE>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<blockquote>' Defines a section that is quoted from another source. ") } else if (HTMLTags3[i] === "<BODY>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<body>' Defines a document's body. ") } else if (HTMLTags3[i] === "<BR>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<br>' Defines a single line break. ") } else if (HTMLTags3[i] === "<BUTTON>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<button>' Defines a clickable button. ") } else if (HTMLTags3[i] === "<CANVAS>" ) { setTimeout(botSays, 600, "\nBot : The HTML tag '<canvas>' Used to draw graphics, on the fly, via scripting. Usually Javascript. ") }                     
                    }else if (question.includes(Actions[i])) {
                        Else = false; if (question.includes("CHALLENGE")) { setTimeout(botSays, 600, "\nBot : Challenge my creator. Go for it.") } else { setTimeout(botSays, 600, "\nBot : How can I help?  Use my commands !Menu & !Tutorial to see what I can do.") }
                    } else if (question.includes(Questions[i])) {
                        Else = false; if (Questions[i].includes("HTML")) { setTimeout(botSays, 600, "\nBot : Ask my creator. Go for it. Post your question in the comments, he'll try to help you. I'm just a code, I don't know HOW to code.") } else { setTimeout(botSays, 600, "\nBot : How can I help? Use my commands !Menu & !Tutorial to see what I can do.") }
                    } else if ( question.includes(Greeting[i]) ) {
                        Else = false; if (Greeting[i].includes("HOW")&&Greeting[i].includes("YOU")) {
                        var reactHello = "How am I";
                        var reactGreeting = "I would say I am 40% complete." }
                        else {
                       num = Math.ceil(Math.random()*3)
                        var reactHello = Greeting[num]
                        reactHello = reactHello.toLowerCase();
                        reactHello = reactHello.charAt(0).toUpperCase() + reactHello.slice(1);
                        var reactGreeting = "Same old. Getting coded mostly.";
                        }
                        var reactPleasant = BotPleasant[num]
                        setTimeout(botSays, 600, "\nBot : " + reactHello + ". " + reactGreeting + " " + reactPleasant )
                      } else if (question.includes(Hello[i])) {
                      var reactHello = Hello[i];
                      reactHello = reactHello.toLowerCase();
                      reactHello = reactHello.charAt(0).toUpperCase() + reactHello.slice(1);
                      var reactGreeting = "";
                      var reactPleasant = ""
                        Else = false;
                          setTimeout(botSays, 600, "\nBot : " + reactHello + ".")
                    } else { } }  setTimeout( function() { if (Else === true) {botSays("\n\n**Error 404: Response Not Found."); } } , 700);  setTimeout( function() {Else = true; botChat.scrollTop = botChat.scrollHeight;}, 730)
                }
                
                function botSays(x) {
                    document.getElementsByTagName("textarea")[0].innerHTML += x;
                } 
                
                function youSay(x) { botSays("\n"+ you + " \ : " + x)
                }
    
                function youDo(x) { botSays("\n"+ you + " " + x)                                            
                } function enterButton(e, x) { if (e.keyCode == 13) { answer(x); }   }    
});


