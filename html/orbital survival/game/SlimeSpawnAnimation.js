pc.script.attribute('finalScale','vec3');
pc.script.create('SlimeSpawnAnimation', function (app) {
    // Creates a new SlimeSpawnAnimation instance
    var SlimeSpawnAnimation = function (entity) {
        this.entity = entity;
    };

    SlimeSpawnAnimation.prototype = {

        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.time = 0;
            this.smalSize = new pc.Vec3(0.1,0.1,0.1);
            this.startPos = new pc.Vec3(0,50,0);
            this.finalPos = new pc.Vec3(0,18.75,0);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if(this.time < 0.7){
                var a = pc.math.clamp(this.time += dt,0,0.7);

                this.entity.setLocalScale(new pc.Vec3().lerp(this.smalSize, this.finalScale,a/0.7));
                this.entity.setLocalPosition(new pc.Vec3().lerp(this.startPos, this.finalPos,a/0.7));
                
                if(a == 0.7){
                    this.entity.animation.play('SlimeLand');
                    setTimeout(function(){this.entity.animation.play('SlimeIdle');}.bind(this),0.333);
                }
            }
        },
        
        onEnable: function(){
            this.entity.setLocalPosition(0,50,0);
            this.entity.setLocalScale(0.1,0.1,0.1);
            this.time = 0;
            this.entity.animation.play('SlimeJump');
        }
    };

    return SlimeSpawnAnimation;
});