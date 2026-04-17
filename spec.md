# Problem Statement

It Feels Very Time Consuming For Me To Read Out A Full Webpage To Understand Any Research Topic.

# Solution

I Want To Build A Web Application That Can Summarize A Full Webpage Content So That I Can Easily Understand The Research Topic In Less Time.

# Functional Requirements

1. I Need A Frontend Which Will Have A Searchbar And A Chatbox To Ask Questions About The Research Topic.
2. It Will Be An AI Powered Application Which Will Use LLM To Summarize The Webpage Content And Answer The Questions.
3. I Will Need A Backend Endpoint To Handle The Requests From The Frontend And Send The Responses To The Frontend.
4. Frontend Will Submit A Post Request To The Backend Endpoint With The URL Of The Webpage.
5. Backend Will Fetch The Content Of The Webpage And Send It To The LLM To Summarize.
6. LLM Will Return The Summary Of The Webpage Content.
7. Backend Will Send The Summary To The Frontend.
8. Frontend Will Display The Summary To The User.
9. User Can Ask Questions About The Research Topic.
10. Backend Will Send The Questions To The LLM And Return The Answers To The Frontend.
11. Frontend Will Display The Answers To The User.
12. The Chat History Will Be Saved In The Local Storage Of The Browser.

# Constraints

 1. The WebApp Must Handle The Errors Caused By The Backend During Sending And Fetching Of The Data From The LLM. (if any)
 2. We Must Track Every Major Progress In The Development Process And Commit The Code To The Git Repository.

# Edge Cases & Error Hadeling

 1. If The LLM Is Not Able To Summarize The Webpage Content? (if any)
 2. If The Backend Is Not Able To Fetch The Content Of The Webpage? (if any)
 3. If The Frontend Is Not Able To Send The Request To The Backend? (if any)
 4. If The Frontend Is Not Able To Receive The Response From The Backend? (if any)
 5. If The Frontend Is Not Able To Display The Summary To The User? (if any)
 6. If The Frontend Is Not Able To Display The Answers To The User? (if any)
 7. If The Frontend Is Not Able To Save The Chat History To The Local Storage? (if any)
  Then Return An Error Message To The User Describing The Error.
