# vary-my-covers

This application allows a user to choose multiple files from a chosen location, which it will use to populate a scrollable carousel. No database is used,
only a reader which grabs preview images of the files and displays them. 

Currently commented out is the functionality that will provide a strip of thumbnails below the larger carousel. 

/** Issue I'm currently trying to figure out: I can't seem to get the FileList object created by the reader into an array, which is an integral part
of how my application determines where to apply the '.current-slide' class. 