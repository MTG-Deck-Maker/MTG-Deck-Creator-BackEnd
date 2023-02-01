# Software Requirements

## Vision

 Nowaday there are apps that help us do just about anything from managing our finance to buying things online, but there aren't very many applications that help magic the gathering enthusiasts manage their cards. This app aims to help devoted players of magic the gathering keep track of cards they own, build future decks, and help strategize their game to get an edge over their opponents. With this application, a user can add cards to their deck, manage their current deck, and look up future cards that they want to play with.


## Scope (In/Out)

IN - What will your product do:

- It will create a database.
- Create a card deck.
- Update cards in the deck.
- Delete cards from the deck.
- Each user will have a unique login user ID.

OUT - What will your product not do:

- Let you play the game on the website.
- Multiple decks to play with.
- Wont tell you the game rules and if they are legal for use.

### Minimum Viable Product vs

What will your MVP functionality be?
The app will have the CRUD functions via scards, be able to search for a card, and manage current deck of cards, finally the user will be able to sign in.
What are your stretch goals?

- Multiple decks

### Stretch

- Multiple decks
- Prize cost for each card
- Selector for the format of cards for legality of each card displays cards that are legal for use.

## Functional Requirements

List the functionality of your product. This will consist of tasks such as the following:

An admin can create and delete user accounts
A user can update their decks information
A user can search all of the card in the inventory

### Data Flow

![Data Flow](/MTG%20Wireframe.png)

## Non-Functional Requirements (301 & 401 only)

- Security Auth0 implementation to have users login.
- Usability the user can login and immidiately be able to navigate through the app without a guide for the user interface.