export default class CommentsService {
    constructor(url){
        this.url = url
    }

    // Get the comments list
    list(successCallback, errorCallback){
        $.ajax({
            url: this.url,
            success: successCallback,
            error: errorCallback
        });
    }

    // Create a comment
    create(comment, successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            method:"post",
            data: comment,
            success: successCallback,
            error: errorCallback
        })
    }

    // Create or update a comment
    save (comment, successCallback, errorCallback)  {
        if (comment.id){
            this.update(comment, successCallback, errorCallback)
        } else{
            this.create(comment, successCallback, errorCallback)
        } 
    }

    // Get a comment detail
    getDetail(commentId, successCallback, errorCallback) {
        $.ajax({
            url:`${this.url}/${commentId}`,
            success: successCallback,
            error: errorCallback
        })
    }

    // Update a comment
    update(commentId, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}${comment.id}`,
            method:"put",
            data: comment,
            success: successCallback,
            error: errorCallback
        })
    }

    // Delete a comment 
    delete(commentId, successCallback, errorCallback) {
        $.ajax({
            url:`${this.url}${commentId}`,
            method: 'delete',
            success: successCallback,
            error: errorCallback
        })
    }
}