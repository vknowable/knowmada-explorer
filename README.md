## Knowmada explorer for Namada

(WIP)  

Works in tandem with [this](https://github.com/vknowable/namadexer/tree/extra-endpoints) fork of Namadexer on the backend.  
In addition to Namadexer's indexing and included json endpoints, a few additional endpoints have been bolted on to query chain parameters etc from the indexer's Namada fullnode

### Setup
You will need to run the above fork of Namadexer for the indexed data -- this endpoint will need to be accessible to the frontend from the client browser.  
You will also need a full node accessible to the indexer, however this does not need to be accessed directly from the client browser.  

In the `.env.local` file (create this file in the project root if it doesn't exist) add/edit this line:
```
NEXT_PUBLIC_API_URL="http://localhost:30303"
```
with the url to the Namadexer json server  

and add this line:
```
NEXT_PUBLIC_NATIVE_TOKEN_ALIAS="NAAN"
```
to display the alias of the native token
