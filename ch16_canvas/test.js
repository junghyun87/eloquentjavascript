/**
 * Created by junghyun on 2016. 5. 16..
 */
console.log($("input[accept]"));
$("input[accept]").val("").on("change",function (event) {
    var element,files,file,URL,url,fileReader;
    element = $(this).next();
    // Get a reference to the taken picture or chosen file
    files = event.target.files;
    if (files && files.length > 0) {
        file = files[0];
        if(element.is("img")) {
            try {
                // Get window.URL object
                URL = window.URL || window.webkitURL;

                // Create ObjectURL
                url = URL.createObjectURL(file);

                // Set img src to ObjectURL
                element.attr("src",url);

                // Revoke ObjectURL
                URL.revokeObjectURL(url);
            } catch (e) {
                try {
                    // Fallback if createObjectURL is not supported
                    fileReader = new FileReader();
                    fileReader.onload = function (event) {
                        element.attr("src",event.target.result);
                    };
                    fileReader.readAsDataURL(file);
                } catch (e) {
                    // Display error message
                    $("#error").text("Neither createObjectURL or FileReader are supported");
                }
            }
        } else {
            try {
                // Fallback if createObjectURL is not supported
                fileReader = new FileReader();
                fileReader.onload = function (event) {
                    element.attr("src",event.target.result);
                };
                fileReader.readAsDataURL(file);
            }
            catch (e) {
                // Display error message
                $("#error").text("Neither createObjectURL or FileReader are supported");
            }
        }
    }
});