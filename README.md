## Knowmada explorer for Namada

(WIP)  

Works in tandem with [this](https://github.com/vknowable/namadexer/tree/extra-endpoints) fork of Namadexer on the backend.  
In addition to Namadexer's indexing and included json endpoints, a few additional endpoints have been bolted on to query chain parameters etc from the indexer's Namada fullnode

### Setup
In the `.env.local` file (create this file in the project root if it doesn't exist) add/edit this line:
```
NEXT_PUBLIC_API_URL="http://localhost:30303"
```
with the url to the Namadexer json server
