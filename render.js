function makeJsonTable(platform, target, json, data) {
    var table = $("<table/>").addClass('CSSTableGenerator');

    var has_failures = false;
    $.each(json.data, function(rowIndex, r) {
        var status = r.pipeline.status;
        if (status == "red") {
            has_failures = true;
            table.append(renderFailureRow(rowIndex, r.pipeline.badge, data));
        }
    });

    table.prepend(renderTitleRow(platform, has_failures))
    table.prepend(renderTitleGraphic(platform, has_failures))

    return $(target).append(table);
}

function renderFailureRow(rowIndex, badge, data) {
    var dataRow = data[rowIndex];
    var id = dataRow[0];
    var platform = dataRow[1];
    var logo = dataRow[2];
    var title = dataRow[3];
    var branch = dataRow[4] || "master";

    var row = $("<tr/>");
    row.append($("<td/>"));
    row.append($("<td/>").attr("width", "110px").append(makeStatusImg(badge)));
    row.append($("<td/>").attr("width", "50px").append(makeLogoImg(logo)));
    row.append($("<td/>").attr("width", "500px").text(title));
    row.append($("<td/>").attr("width", "50px"));

    return row;
}

function renderTitleRow(platform, has_failures) {
    var title = "";
    if (has_failures) {
        title = $("<div/>")
            .attr("class", "blinker")
            .append($("<span/>")
                .attr("style", "color:#ed6347; font-size:22pt")
                .html("&#x2718;"))
            .append($("<b/>").html(" Builds failing as of " + shortDate()));
    } else {
        title = $("<div/>")
            .append($("<span/>")
                .attr("style", "color:#95bf46; font-size:22pt")
                .html("&#x2714;"))
            .append(" All builds passing as of " + Date());
    }

    var row = $("<tr/>");
    row.append($("<td/>"));
    row.append($("<td/>").attr("colspan", "3").html(title));
    return row
}

function getTitleGraphic(platform) {
    var params = new URLSearchParams(window.location.search)
    var theme = params.get('theme')

    var graphic = platform.toLowerCase();

    switch (theme) {
        case "default":
            graphic = platform.toLowerCase();
            break;
        case "winter":
            graphic = "snowflake-" + platform.toLowerCase();
            break;
        case "halloween":
            graphic = "pumpkin";
            break;
        case "valentine":
            graphic = "heart";
            break;
    }

    return graphic;
}

function renderTitleGraphic(platform, has_failures) {
    var status = has_failures ? "red" : "green"
    var graphic = getTitleGraphic(platform);

    var row = $("<tr/>")
        .append($("<th/>")
            .attr("align", "left")
            .append($("<img/>")
                .attr("src", "images/" + graphic + "-" + status + ".png")
                .attr("width", "64px")
                .attr("height", "64px")))
        .append($("<th/>")
            .html("&nbsp;&nbsp;" + platform)
            .attr("colspan", "2")
            .attr("style", "vertical-align: middle; text-align: left; font-size:24pt;"));

    return row
}

function makeLogoImg(logo) {
    if (logo == "") {
        return null
    }
    var img = $("<img/>")
    img.attr("width", "44px")
    img.attr("src", "images/" + logo + ".png")
    return img
}

// https://badge.buildkite.com/sample.svg?status=passing
// https://badge.buildkite.com/sample.svg?status=failing
// https://badge.buildkite.com/sample.svg?status=unknown
// &theme=95bf46,ed6347,999
function makeStatusImg(badge) {
    var img = $("<img/>");
    img.attr("width", "90px");
    img.attr("src", badge + "&theme=95bf46,ed6347,999")
    return img;
}