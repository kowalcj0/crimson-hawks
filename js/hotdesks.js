var hotdesks = [
["HDA1","Keith Reed","1234","keith.reed@1248.io","","28/11/2014 09:00","28/11/2014 17:00"],
["HDA2","Steve Lake","4 Corners","steve@4cornersimages.com","","28/11/2014 09:00","28/11/2014 17:00"],
["HDA3","Luke Hood","AEI Media"," luke.hood@aeimedia.co.uk","","28/11/2014 11:00","28/11/2014 13:00"],
["HDA4","David Grundy","ALCS","David.Grundy@alcs.co.uk","","28/11/2014 09:00","28/11/2014 17:00"],
["HDB1","Keith Barfoot","AlphaFox Systems Ltd","crystal@alphafoxsystems.com","(0)1404 42455","28/11/2014 09:00","28/11/2014 17:00"],
["HDB2","Thibaut Rouffineau","Apptual","thibaut.rouffineau@apptual.com","07768 421 323","28/11/2014 09:00","28/11/2014 17:00"],
["HDB3","Jonathan Duffy","Beacontent","jonathan@beacontent.co.uk","0208 144 1961 / 0771 774 0257","28/11/2014 09:00","28/11/2014 17:00"],
["HDB4","Stephen McConnachie","BFI","Stephen.McConnachie@bfi.org.uk","","28/11/2014 09:00","28/11/2014 17:00"],
["HDC1","Jamie Paton","Canary Care","jamie@canarycare.co.uk","07773 358 727","28/11/2014 09:00","28/11/2014 17:00"],
["HDC2","Abbie Enock","Capture","abbie.enock@capture.co.uk ","","28/11/2014 09:00","28/11/2014 17:00"],
["HDC3","Patrick Bergel","Chirp","patrick@chirp.io","(0)7971 987 064","28/11/2014 09:00","28/11/2014 17:00"],
["HDC4","Ali Hossaini","Cinema Arts Network","ali@cinema-arts.net","0783 454 2479","28/11/2014 09:00","28/11/2014 17:00"],
["HDD1","James Bennett","CLA","james.bennett@cla.co.uk","","28/11/2014 09:00","28/11/2014 17:00"],
["HDD2","Shaun Cutler","Clixta","shaun@clixta.com","","28/11/2014 08:00","28/11/2014 12:00"],
["HDD3","Sam Obernick","Copyright Hub Board","gardenflat@mac.com ","","28/11/2014 14:00","28/11/2014 18:00"],
["HDD4","Maxine Horn","Creative Barcode","m.j.horn@creativebarcode.com","","28/11/2014 09:00","28/11/2014 17:00"],
["HDE1","Evelyn Wilson","CreativeWorks","evelyn@cwlondon.org.uk","020 7420 9443","28/11/2014 09:00","28/11/2014 17:00"],
["HDE2","James Cobb","Crowd Connected Ltd","james@crowdconnected.co.uk","01483 688 305 / 07798 842532","28/11/2014 09:00","28/11/2014 17:00"],
["HDE3","Dariush Golzarmanesh","CTO","dariushg@nla.co.uk","","28/11/2014 09:00","28/11/2014 17:00"],
["HDE4","Edward Averdieck","Cue Songs","ed@cuesongs.com","07515 100 995","28/11/2014 12:00","28/11/2014 14:00"],
["HDF1","Sejul Malde","Culture24","Sejul@culture24.org.uk","01273 623 266","28/11/2014 09:00","28/11/2014 17:00"],
["HDF2","Steve Olesansky","DeepSine Ltd (Petri)","deepsine@gmail.com","07787 407 222","28/11/2014 09:00","28/11/2014 17:00"],
["HDF3","David Hoffman","EPUK","david@hoffmanphotos.com","","28/11/2014 09:00","28/11/2014 17:00"]
]


String.format = function() {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];
    
    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    
    return theString;
}


String.capitalize = function() {
    return this.toLowerCase().charAt(0).toUpperCase() + this.slice(1);
}


var fillDeskData = function() {
    for (desk in hotdesks) {
        $("#HD"+hotdesks[desk][0]).html(hotdesks[desk][2]);
    }
};


var getDesk = function(deskId) {
    var desk = ["N/A","N/A","N/A","N/A","N/A","N/A","N/A"];
    for (d in hotdesks) {
        if (hotdesks[d][0] == deskId) {
            console.log("found desk: "+deskId+" - "+hotdesks[d][4]);
            desk = hotdesks[d];
        };
    };
    return desk;
}


var getDeskDetails = function(deskId) {
   var desk = getDesk(deskId); 

   var cols = ["Desk","Name","Organistation","Email","Phone","Time in","Time Out"];
   var output = "<table id='deskDetails' class='deskDetails'>";

   var cellTemplate = "<tr id='{0}Cell' class='tooltipCell'>"+
                           "<td colspan=2 id='{1}Field' class='tooltipField'>{2}</td>"+
                           "<td id='{3}Value' class='tooltipValue'>{4}</td>"+
                       "</tr>";

   for (col in cols) {
        c = String.format(cellTemplate,
                          cols[col].replace(" ",""), 
                          cols[col].replace(" ",""),
                          cols[col],
                          cols[col].replace(" ",""),
                          desk[col])
        output += c;
   }

   output += "</table>";
   console.log(output);

   return output;
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
