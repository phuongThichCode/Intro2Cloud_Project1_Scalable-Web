const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    const json = [
            {
                title: "Post 1",
                content: "Deserunt veniam et tempor officia. Eu est elit ea tempor sint. Mollit consequat pariatur incididunt aute sint sit veniam. Ex tempor ipsum voluptate culpa qui do nulla fugiat velit laboris. Cillum nulla labore veniam laboris sint. Et nisi duis culpa deserunt enim ad.",
                published_date: "2023-10-01T00:00:00Z",
                updated_date: "2023-10-02T00:00:00Z"
            },
            {
                title: "Post 2",
                content: "Proident non nisi Lorem officia incididunt aliquip nostrud mollit. Est ipsum fugiat aliqua Lorem sit ullamco. Adipisicing voluptate quis Lorem in ea ea qui enim id reprehenderit consequat. Excepteur quis do proident sunt deserunt nisi. Do sint culpa tempor ea ad anim culpa tempor.",
                published_date: "2023-10-03T00:00:00Z",
                updated_date: "2023-10-04T00:00:00Z"
            },
            {
                title: "Post 3",
                content: "Laborum cillum culpa esse officia nostrud aliquip aliquip nisi exercitation. Fugiat aliquip aliquip eiusmod reprehenderit. Ea non dolore aliquip non in tempor esse quis eu culpa laborum. Ea in eu consectetur duis incididunt ad enim eiusmod commodo ullamco aute sit in occaecat. Excepteur voluptate officia id incididunt eu Lorem veniam voluptate. Cillum ad consequat elit id aliquip culpa dolore ea ipsum exercitation. Et cillum deserunt veniam aliqua incididunt do consequat aute.",
                published_date: "2023-10-05T00:00:00Z",
                updated_date: "2023-10-06T00:00:00Z"
            },
            {
                title: "Post 4",
                content: "Non nostrud magna laborum culpa nostrud pariatur laboris. Exercitation aute consequat irure culpa et voluptate culpa sint mollit velit minim. Velit magna aute elit exercitation enim sint do mollit sunt labore duis aliqua. Ut amet dolore labore ipsum proident sint reprehenderit labore exercitation. Aute ex culpa et nulla anim sint nisi veniam incididunt.",
                published_date: "2023-10-07T00:00:00Z",
                updated_date: "2023-10-08T00:00:00Z"
            }
        ]

    res.json(json);
});

module.exports = router;