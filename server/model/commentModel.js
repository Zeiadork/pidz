const fs = require('fs');
const commentData = require('../data/commentData.js');

class Comment {

    constructor(id, journalId, content, reactions, giphy) {

        this.id = id;
        this.journalId= journalId;
        this.content = content;
        this.reactions = reactions;
        this.giphy = giphy; 
    }

    static get all(){
        return commentData;
    }

    // finds comment based on id 
    static findCommentById(id){
        try{
            const commentArr = commentData.filter((comments)=> comments.id ===id)[0];
            const comment = new Comment (commentArr.id, commentArr.journalId, commentArr.content, commentArr.reactions, commentArr.giphy);
            return comment;
        } catch (error) {
            throw new Error("That comment does not exist!");
        }        
    }

    // finds comment based on journalId
    static findCommentByJournalId(journalId){
        try{
            const commentArrJourn = commentData.filter((comments)=> comments.journalId ===journalId)[0];
            const commentByJournal = new Comment(commentArrJourn.id, commentArrJourn.journalId, commentArrJourn.content, commentArrJourn.reactions, commentArrJourn.giphy);
            return commentByJournal;
        } catch (error) {
            throw new Error("That journal id doesn't have any comments!");
        }        
    }

    // creates new comment
    static create(comments){
        // const commentId = comments.length + 1;
        // let newComment = new Comment({id: commentId, ...comments})    
        // commentData.push(newComment);
        // return newComment;

        let commentId = commentData.length + 1; // creates the new comment's id
        console.log(`Adding comment with content: ${comments.content}`);
        let newComment = new Comment(commentId, comments.journalId, comments.content, comments.reactions, comments.giphy);

        console.log(`New comment: ${comments.content} regading the journal with id: ${comments.journalId}`);
        commentData.push(newComment);
        this.saveComments();
        return newComment;
    }


    //Call this method after making any change, i.e. create comment or update comment.  MAY want to use Async and await to stop processing other functions.
    static saveComments()
    {
        //get the data we want to save
        const dataToSave = JSON.stringify(commentData);

        //use fs.writeFile, specify location to save, what to save, and error handling.
        fs.writeFile('../data/commentJSONData.txt', dataToSave, err =>
        {
            if (err)
            {
                console.log("Couldn't save comment data, reason: " + err);
            }
            else
            {
                console.log("Successfully saved comment data.");
            }
        })
        
    }


}

module.exports = Comment;
