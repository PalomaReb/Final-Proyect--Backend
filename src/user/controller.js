import { getUserInfo, updateUser, postUserReview, retrievalReviews } from './user.model.js'

export const getUserInfoController = async (req, res) => {
    const user = await getUserInfo(req.email);
    if (user !== undefined) {
        res.send(user);
    } else {
        res.status(404).send('no lo encuentro');
    }
}


export const updateUserController = async (req, res) => {
    updateUser(req.email, req.body);
    res.send();
}

export const addUserReview = async (req, res) => {
    postUserReview(req.email, req.body.alias, req.body.review)
    res.send('review mandado')
}

export const getReviewsController = async (req, res) => {
    const arrayReviews = await retrievalReviews()
    // console.log(arrayReviews)
    if (arrayReviews.length > 0) {
        res.status(200).send(arrayReviews)
    }
    else {
        res.status(404).send('no existen tus putos reviews')
    }
}