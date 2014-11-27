hotdesk_columns= {"Desk_number": "",
                  "Title": "",
                  "First": "",
                  "Last": "",
                  "email": "",
                  "Company": "",
                  "Phone": "",
                  "Time_in": "",
                  "Time_Out": ""}

hotdesks = [
["HDA1","Mr","James","Northon","james@northon.com","Nice mouse","12345678","2014-11-28 10:00","2014-11-28 18:00"],
["HDA2","Mr","Miles","Davis","miles@davis.com","Nice mouse","123445678","2014-11-28 13:00","2014-11-28 17:00"],
["HDA4","Mr","Chris","Clark","miles@davis.com","Nice mouse","123445678","2014-11-28 13:00","2014-11-28 17:00"],
["HDB2","Mr","Keith","Flint","miles@davis.com","Monty Python","123445678","2014-11-28 13:00","2014-11-28 17:00"],
["HDC3","Mrs","Monica","Nova","miles@davis.com","Nice mouse","123445678","2014-11-28 13:00","2014-11-28 17:00"],
["HDF1","Mrs","Lara","Mint","miles@davis.com","digi cats","123445678","2014-11-28 13:00","2014-11-28 17:00"],
]


var fillDeskData = function() {
    for (desk in hotdesks) {
        $("#HD"+hotdesks[desk][0]).html(hotdesks[desk][2]);
    }
};

var getDesk = function(deskId) {
    var desk = "N/A";
    for (d in hotdesks) {
        if (hotdesks[d][0] == deskId) {
            console.log("found desk: "+deskId+" - "+hotdesks[d][4]);
            desk = hotdesks[d][4];
        };
    };
    return desk;
}

var getDeskDetails = function(deskId) {
   var desk = getDesk(deskId); 
   console.log("details: "+desk);

   return desk;
}

!function ($) {
  $(function(){
    fillDeskData();

    $("div[id*='HD']").tooltip({
        items: "[id]",
        content: function() {
            var element = $( this );
            return getDeskDetails(element.context.id);
        },
        show: "slideDown", // show immediately
        open: function(event, ui)
        {
            ui.tooltip.hover(
            function () {
                $(this).fadeTo("slow", 0.5);
            });
        }
    });
  });
}(window.jQuery);
