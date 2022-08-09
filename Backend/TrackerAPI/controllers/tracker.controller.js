const redis = require('redis');
const {
    getPositionFromNMEA
} = require('../utils/tracker.utils')

let client = null;
(async () => {
    client = redis.createClient({
        url: 'redis://localredis:6379'
    });
    await client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
})();

exports.stock = async (req, res) => {
    if (!req.header('cane').length){
        res.status(401).json({message: "Token is missing"});
    }
    const token = req.header('cane');
    let position = getPositionFromNMEA(req.query.data);
    if (position.lat !== null) {
        if (client == null){
            res.status(500).json({message: "Redis not connected"});
        }
        //stocker la position dans redis avec comme clé le token de la canne
        await client.set(token, JSON.stringify(position));
        res.status(201).json({message: "Cane's position updated"});
    } else {
        res.status(404).json({message: "Error while updating cane's position with the token", token});
    }
}

exports.get = async (req, res) => {
    if (!req.header('cane')){
        res.status(401).json({message: "Token is missing"});
    }
    const token = req.header('cane');
    if (client == null){
        res.status(500).json({message: "Redis not connected"});
    }
    let redisPosition = await client.get(token);
    redisPosition = JSON.parse(redisPosition);
    res.status(200).json({token, redisPosition});
}

/*// Retrieve random user position
   exports.setPosition = async (req, res) => {
       const id = req.params.id;
       let position = getPositionFromNMEA(req.query.data);
       if (position.lat !== null) {
           if (!await getUser({id: id})) res.status(404).send({message: "Cet identifiant n'existe pas"})
           let user = getUser({id: id});
           var selector = {
               where: { id: id }
           };
           user.position = position;
           console.log(user);
           User.update(user, selector)
               .then(response => {
                   res.status(200).json({message: "User's position updated successfully"})
               })
               .catch(err => {
                   res.status(404).json({message: "Error while updating user's position with id "+id})
               })
       } else {
           res.status(404).json({message: "Error while updating user's position with id "+id})
       }
   };

   exports.getPosition = async (req, res) => {
       const id = req.params.id;
       if (!await getUser({id: id})) res.status(404).send({message: "Cet identifiant n'existe pas"})
       let user = await getUser({id: id});
       res.status(200).send(user.position);
   };*/

/*
The format for NMEA coordinates is (d)ddmm.mmmm
d=degrees and m=minutes divide the minutes by 60 and add that to the degrees.

    For the Latitude=35.15 N
There are 60 minutes in a degree so
35.15/60 = .5858 N

For the Longitude= 12849.52 E,
    128+ 49.52/60 = 128.825333 E
la ligne de la canne : $GNRMC,193321.000,A,4858.509355,N,00221.244126,E,0.00,0.00,041021,,,A*75*/
