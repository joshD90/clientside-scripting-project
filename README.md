# clientside-scripting-project

### A mock business website that is being set up as part of a College Project for the Client Side Scripting Module

## Git / Github

Open a terminal / console and 'cd' to the folder where you want the project ot be held.

```
git clone https://github.com/joshD90/clientside-scripting-project.git
```

We need to create a new branch for every feature that we create. (plug in your own branch name instead of <new-branch-name>)

```
git pull origin main
git checkout -b <new-branch-name>
```

Make the changes and commit them to this branch

```
git add .
git commit -m "Commit with a descriptive message of what you have changed"
```

Push the branch to the remote repository on Github

```
git push origin
```

Now we want to push these to Github from our local environment.

```
git push origin <branch-name>
```

Now the changes have been pushed to the remote repository under that branch name.

## Opening a pull request

Go to the repository on GitHub.com and click the "Compare & pull request" button for your branch.
Fill in the PR template, providing a summary of your changes and any other relevant information for reviewers.

This will notify everyone else on the team so that they can look at it and approve it.

## Approving a pull request

- Approve the PR request if you are happy and there are no conflicts. (Click on button)
- An option will come up that you can now Merge. Click this button
- Choose "Squash and Merge" - Click this Button and this will merge the branch to main.

## Update Your own Repository

Go back to your own local repository / folder on your computer
Make sure you are on main branch and then pull from the remote repository

```
git checkout main
git pull origin main
```

# Dealing with Merge Conflicts

Dealing with merge conflicts can seem daunting at first, but it becomes straightforward once you get the hang of it. Here's a simplified step-by-step guide to resolving conflicts by pulling changes to your local repository:

## 1. Ensure Your Branch is Up-to-Date

Before you start resolving conflicts, make sure your local branch is up-to-date with the main branch. This step can help minimize the number of conflicts.

- Switch to your main branch:

```
git checkout main
```

- Pull the latest changes from the remote repository:

```
git pull origin main
```

## 2. Switch to Your Feature Branch

- Go back to the branch where you're working on your feature or the changes that caused the conflict.

```
git checkout your-branch-name
```

## 3. Merge the Main Branch into Your Branch

- Merge the latest changes from the main branch into your feature branch. This step might trigger the conflicts.

```
git merge main
```

- If there are conflicts, Git will stop the merge and tell you which files need attention.

## 4. Resolve the Conflicts

- Open the conflicting files in your code editor. Git marks the conflicts in the file so you can see the differences.
- You'll see sections marked with `<<<<<<<`, `=======`, and `>>>>>>>`. These markers define the conflicting changes from both branches.
- Decide which changes to keep, edit the file to resolve the conflicts, and remove the Git markers.

## 5. Mark Conflicts as Resolved

- After you've resolved the conflicts in a file, you need to add the file to the staging area to indicate that the conflict is resolved:

```
git add filename
```

## 6. Complete the Merge

- Once all conflicts are resolved and the files are added, you can complete the merge process:

```
git commit
```

- Git will open your default text editor to allow you to edit the commit message for the merge. You can simply save and close the editor to accept the default message.

## 7. Push Your Changes

- Push your resolved changes back to the remote repository:

```
git push origin your-branch-name
```

## 8. Create a new pull request for the resolved merges

Go back onto Github and click on create new pull request and process repeats again
