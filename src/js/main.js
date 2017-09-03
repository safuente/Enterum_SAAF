import "babel-polyfill";// soporte para IE11

window.$ = window.jQuery = require("jquery"); // Hace jQuery accesible públicamente

import CommentsService from "./CommentsService";
import CommentsListManager from "./CommentsListManager";
import CommentFormManager from "./CommentFormManager";
import PubSub from "pubsub-js";


const commentService = new CommentsService("/comments/");

const commentsListManager = new CommentsListManager(".comments-list", commentService, PubSub);
commentsListManager.init();

const commentFormManager = new CommentFormManager(".comment-form", commentService, PubSub);
commentFormManager.init();


// Calculo diferencia de fechas
function get_difference(dt2, dt1) {
    let days = ['Sunday','Mon', 'Tue', 'Wed', 'Thursday', 'Friday', 'Saturday'],
    dayDiff= "";
    let diff =(dt2.getTime() - dt1.getTime()) /1000 ;
        console.log(diff)
        if (diff>86400 && diff<604800){
            dayDiff=days[dt1.getDay()];
            console.log(typeof(dayDiff));
            return dayDiff;
            }
        else{
        return Math.abs(Math.round(diff));
        }
}

// Calculo de fecha de publicación
function getDateFormat(difference){
    
    if (difference <60){
        var dateNew = (difference+" seconds ago");
        
    }
    else if (difference<3600){
        
        var dateNew = Math.round(Math.abs(difference)/60)+" minutes ago";
       
    }
    else if (difference<86400){
        
        var dateNew = Math.abs(Math.round(difference/3600))+" hours ago";
        
    }
    else if (typeof(difference) === 'string'){
        var dateNew = difference
    }
    else{
        var dateNew= "Jan 15, 2017 12:00";
    }
    return dateNew;
}


function updateTime(elementID,newDate) {
        
    document.getElementById(elementID).innerHTML = newDate ;
    //setTimeout(updateTime, 5000);
}


// Suma en la función me gusta
$('.target').click(function() {
    var id= this.id
    $('#result-'+id).html(function(i, val) { return val*1+1});
    
    })


//  Despliegue lento de menu
 $('button.nav-button').click( function() {
        var nav_li = $('.navbar > ul.navbar-list > .navbar-item');
        nav_li.slideToggle("slow");
        })
    
    
 //Simulación de fechas para fecha de publicación       
var dt1 = new Date("Jan 15, 2017 12:00:00");
var dt2 = new Date("Jan 15, 2017 11:59:55");
var dt3 = new Date("Jan 15, 2017 12:05:00");
var dt4 = new Date("Jan 14, 2017 13:00:00");
var dt5 = new Date("Jan 13, 2017 13:00:00");
var dt6 = new Date("Jan 01, 2017 13:00:00");
var dt7 = new Date("Jan 15, 2017 11:59:01");
var dt7 = new Date("Jan 15, 2017 11:59:01");
var dt8 = new Date("Jan 15, 2017 11:00:05");
var dt9 = new Date("Jan 14, 2017 19:00:00");
var dt10 = new Date("Jan 12, 2017 12:00:00");
var dt11 = new Date("Jan 02, 2017 12:00:00");

// Actualiza fecha de publicación en la lista de articulos
updateTime('timeLessOneMinute',getDateFormat(get_difference(dt1, dt2)));
updateTime('timeLessOneHour',getDateFormat(get_difference(dt1, dt3)));
updateTime('timeLessOneDay',getDateFormat(get_difference(dt1, dt4))); 
updateTime('timeLessOneWeek',getDateFormat(get_difference(dt1, dt5)));  
updateTime('timeMoreOneWeek',getDateFormat(get_difference(dt1, dt6)));          
updateTime('timeLessOneMinute-2',getDateFormat(get_difference(dt1, dt7)));  
updateTime('timeLessOneHour-2',getDateFormat(get_difference(dt1, dt8)));
updateTime('timeLessOneDay-2',getDateFormat(get_difference(dt1, dt9)));
updateTime('timeLessOneWeek-2',getDateFormat(get_difference(dt1, dt10)));
updateTime('timeMoreOneWeek-2',getDateFormat(get_difference(dt1, dt11)));

