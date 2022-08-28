async function onUploadButton()
{
    // let [fileHandle] = await window.showOpenFilePicker();
    // uploadFile(fileHandle);

    const filePromise = window.showOpenFilePicker().then(
        (file) => {
            uploadFile(file);
        }
    )

    // console.log(filePromise)
}
// <input type="file" id="file-selector" name="file-selector" multiple>