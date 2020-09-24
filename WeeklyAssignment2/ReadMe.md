  Goal: 1.Using Node.js, read map9.txt text file that you wrote for last week's assignment. Store the contents of the file in a variable.
        2. write a program in Node.js that will write a new text file with a street address for every row in the table of meetings in map9. 
  
  
  ### Header 3 
  Notes:- 
 --------Process---------
 1. install fs / cheerio 
 2. use fs.readFileSync to add map9.txt (found in WA01 folder) to cheerio variable $
 3. use HTML element view to locate address' and for each pull the html into new variable. 
 4. Save this variable into a new text document map9locations2. In hindsight I realize this is a place where I can eliminate redundancy. 
 5. Line 48 read in new text document and use a split function (ln 66) to break it down by \<br> in the html
 6. Var text3 is assigned to index positions of text2 that correspond to address locations. HTML is further narrowed down by a spit on ","
 7. Line 89 the object (obj5) containing is joined with \n new line and written to map9locations3.
 
            

 
 IMPORTANT: Commented out code may or may not be relevant. Serves as a log of thought process.
 
  Relevant Files:  
    -- Readme.md   
    -- wa02test2.js    
    -- map9locations3.txt