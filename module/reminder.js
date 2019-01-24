
module.exports = (User) => {
    setInterval( () => {
        console.log('test');
        User.aggregate([
            {$unwind: "$todo"},
            {
                $lookup: {
                    from: "TODO_COLLECTION",
                    localField: "todo",
                    foreignField: "_id",
                    as: "todoContent"
                }
            },
            {$unwind: "$todoContent"},
            {$sort: {"todoContent.due_date": 1}}
        ])
    }, 1000);
};