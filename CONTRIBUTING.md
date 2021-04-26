# Contributions to FRONTEND

If you haven't already we strongly suggest you to read [README.md](https://github.com/abhpd-team/OEP-Frontend/blob/main/README.md) before continuing to undestand about the project and for initial installation of the project on your local machine.

## For Beginners

If you haven't contributed to any open source software before please refer to the following guides and tutorials to understand the process and convention. this will make it easier for you and the maintainers to work on the contributions.

**Docs**

1. [https://www.dataschool.io/how-to-contribute-on-github/](https://www.dataschool.io/how-to-contribute-on-github/)
2. [https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork)

**Tutorials**

1. A great tutorial by Cami Williams from Facebook Open Source : [https://youtu.be/c6b6B9oN4Vg](https://youtu.be/c6b6B9oN4Vg)

**Also keep the following points on your mind:**

1. Always create a new brach for your changes branched from development.
2. Try to keep your new branch in sync with the remote development branch before sending PR to avoid conflicts.

**You can practice sending PR here** [https://github.com/abhpd/hacktoberfest2020](https://github.com/abhpd/hacktoberfest2020)

## Contribution workflow

The two important branches are `main` and `development`.

**1. `main` :** This will always contain the production ready and deployed code which will autodeployed on every commit/merge to the main brach at [https://oeportal.herokuapp.com/](https://oeportal.herokuapp.com/)

> When a phase of development at development branch finishes it will be the only branch that will be merged to the main branch.

**2. `development` :** This will contain the under development codebase and will also be autodeployed on every commit/merge to the development brach at [https://dev-oep.herokuapp.com/](https://dev-oep.herokuapp.com/)

> If youre planning to contribute this will be the branch you'll fork and send a PR to

**There might also be the cases where we have to create other branches than these two**

**`other branches` :** For feature addition or improvements which require a seperate branch due to the amount of work needed, in these cases they will have their own branch. These branches will be brached always from the development branch and will be merged to development branch after completion.

> You have to discuss with maintainers on the tasks that requires a seperate branch. Simply open an issue, describe the task and the plans then tag one of the maintainers.

## Release workflow

We would like Fast Security releases and slow feature updates.

The reason we do that is to keep our system as secure as posssible while slow feature updates gives users time to adapt to the new change and our help-guide to update the tutorial on the usage of those features.

Release will be pushed after thorough testing(manual and/or automated) of the current version of development branch autodeployed at [https://dev-oep.herokuapp.com/](https://dev-oep.herokuapp.com/)

## License

[MIT](https://choosealicense.com/licenses/mit/)

## ❤️ Thanks for the read 😊
