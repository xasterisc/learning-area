const input = document.querySelector("input");
const preview = document.querySelector(".preview");

// Hide file input using Opacity
// input.style.visibility = 'hidden';
input.style.opacity = 0;

input.addEventListener("change", updateImageDisplay);

function updateImageDisplay() {
  // use while loop to empty the previous contents of the preview <div>
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  // Grab the FileList object, and store it in curFiles
  const curFiles = input.files;

  if (curFiles.length === 0) {
    // check to see if no files were selected
    const para = document.createElement("p");

    para.textContent = "No files currently selected fr upload";
    preview.appendChild(para);
  } else {
    // if files have been selected,
    // we loop through each one,
    // printing information about it into the preview <div>
    const list = document.createElement("ol");

    preview.appendChild(list);

    for (const file of curFiles) {
      const listItem = document.createElement("li");
      const para = document.createElement("p");

      // custom validFileType() function to check whether the file is of the correct type
      if (validFileType(file)) {
        // print out its name and file size into a list item
        para.textContent = `File name ${file.name}, file size ${returnFileSize(
          file.size
        )}.`;
        // Generate a thumbnail preview of the image
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);

        listItem.appendChild(image);
        listItem.appendChild(para);
      } else {
        // display a message telling the user that they need to select a different file type
        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }
}

// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

// check if any value in the fileTypes matches the file's type property
function validFileType(file) {
  return fileTypes.includes(file.type);
}

// a nicely formatted size in bytes/KB/MB.
function returnFileSize(number) {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}
