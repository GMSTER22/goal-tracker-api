<!-- GETTING STARTED -->
# Goal Track API

### Installation

1. Clone the repo and cd into the folder
   ```sh
   git clone https://github.com/GMSTER22/goal-tracker-api.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
4. Login to your mongodb account: https://account.mongodb.com/account/login
5. Go to "Database", Click on "Connect", Click on the "Drivers" to connect to your application and copy the mongodb uri
3. Create a .env file, paste your mongodb uri for the MONGO_URI key, replace username, password, and add the database name before the options
   ```js
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0-saugt.mongodb.net/<database>?retryWrites=true&w=majority
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
