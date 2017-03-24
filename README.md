# data-miner #
data-miner is a data analysis application written in node.js that is called and run from the commandline. data-miner 
accepts an input file, allows analysis to be performed on it, and produces an analysed output file and/ or graphed output.

### Installation requirements ###
data-miner requires node 6.x, and relies on the following packages:
* yargs: ^7.0.1

### Installing data-miner ###
clone the data-miner repository by navigating to the location where you want to save data-miner, and running the command 
`git clone git@github.com:damienomurchu/data-miner.git`

### Running data-miner ###
From a terminal, navigate to the folder where data-miner is located, and run data-miner with 
`node ./dataminer-cli.js` to outline how to use data-miner from the commandline, and the various flags/ options available. The output should be similar to the following:

![cli-screenshot](/public/images/cli-screenshot.png)