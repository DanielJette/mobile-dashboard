function constructPostBody(data) {

    var body = "{\n  \"pipelines\": [\n";
    var end_mark = ""

    $.each(data, function(rowIndex, r) {

        var dataRow = data[rowIndex];
        var id = dataRow[0];
        var branch = dataRow[4] || "master";

        body += end_mark;
        body += "    {\n      \"pipeline\": {\n";
        body += "        \"id\": \"" + id + "\",\n";
        body += "        \"branch\": \"" + branch + "\"\n";
        body += "      }\n";
        body += "    }";
        end_mark = ",\n";
    });

    body += "\n  ]\n}";
    return body;
}

function postStatus(platform, target, body, table_data) {
    $.ajax({
        url: STATUS_URL + "/bulk",
        dataType: "text",
        type: "POST",
        data: body,
        success: function(data, textStatus, jQxhr) {
            var json = jQuery.parseJSON(data);
            makeJsonTable(platform, target, json, table_data);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            $(target).append(

                $("<div/>")
                .attr("style", "padding-left:64px; color:#ed6347")
                .html(platform + " " + textStatus + ": " + jqXhr.status + " -- " + errorThrown)




            );
        }
    });
}