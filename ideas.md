<<<<<<< HEAD:ideas.md
=======
# Docs

## Delete all comments (only bot's messages) from a program

```javascript
fetchTTs(programID, function (data) {
    let keys = [];
    for (let i of data.feedback) {
        keys.push(i.key);
    }
    for (let j of keys) {
        deleteTipThanks(j, programID);
    }
});
```

>>>>>>> 80be0c5fc8db0e828e83e0cef02c6ebc749bd75a:docs.md
# Ideas

1. Fetches a random post from Dev.to and posts it as a tutorial every week on Khan.
2. Lists a weekly "newspaper" of top projects, etc.
3. Update a program containing popular stock/crypto prices that can be accessed via the API by other KA programs. Or weather data in major cities.
4. Recreate codewars but users submit their solutions through the Tips&Thanks
5. Implement proxy for major APIs. (Like how Squishy did his multiplayer stuff)

# To Do
<<<<<<< HEAD:ideas.md
1. Ability to spin-off a program
2. Ability to get Energy Points
3. 
=======

-   [x] Ability to send guardian-like warnings to users (tested, not possible)
-   [ ] Ability to hide programs
-   [ ] Ability to flag a program
-   [ ] Ability to spin-off a program
-   [ ]
>>>>>>> 80be0c5fc8db0e828e83e0cef02c6ebc749bd75a:docs.md