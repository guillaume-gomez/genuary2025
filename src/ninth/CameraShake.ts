import { Vector3 } from "three";
const HALF_PI = Math.PI * 0.5;
const ONE_SECOND = 1000;
const FPS = 60;

export default class CameraShake {
    _cameraControls = null;
    duration: number = 0;
    strength: number = 1;
    _noiseX = null;
    _noiseY = null;
    _noiseZ = null;
    _lastOffsetX : number = 0;
    _lastOffsetY : number = 0;
    _lastOffsetZ : number = 0;
    startTime : number = 0;

    // frequency: cycle par second
    constructor( cameraControls, duration = ONE_SECOND, frequency = 10, strength = 1 ) {

        this._cameraControls = cameraControls;
        this._duration = duration;
        this.strength = strength;
        this._noiseX = makePNoise1D( duration / ONE_SECOND * frequency, duration / ONE_SECOND * FPS );
        this._noiseY = makePNoise1D( duration / ONE_SECOND * frequency, duration / ONE_SECOND * FPS );
        this._noiseZ = makePNoise1D( duration / ONE_SECOND * frequency, duration / ONE_SECOND * FPS );

        this._lastOffsetX = 0;
        this._lastOffsetY = 0;
        this._lastOffsetZ = 0;

    }

    shake() {
        this.startTime = performance.now();
        this.anim();
    }

    anim() {
        const elapsedTime = performance.now() - this.startTime;
        const frameNumber = ( elapsedTime / ONE_SECOND * FPS ) | 0;
        const progress = elapsedTime / this._duration;
        const ease = sineOut( 1 - progress );

        if ( progress >= 1 ) {
            this._cameraControls.setTarget(
                _vec3b.x - this._lastOffsetX,
                _vec3b.y - this._lastOffsetY,
                _vec3b.z - this._lastOffsetZ,
                false
            );

            this._lastOffsetX = 0;
            this._lastOffsetY = 0;
            this._lastOffsetZ = 0;
            return;

        }

        requestAnimationFrame( this.anim );
        console.log(this._cameraControls)
        let _vec3b = new Vector3();
        this._cameraControls.target( _vec3b );

        const offsetX = this._noiseX[ frameNumber ] * this.strength * ease;
        const offsetY = this._noiseY[ frameNumber ] * this.strength * ease;
        const offsetZ = this._noiseZ[ frameNumber ] * this.strength * ease;

        this._cameraControls.setTarget(
            _vec3b.x + offsetX - this._lastOffsetX,
            _vec3b.y + offsetY - this._lastOffsetY,
            _vec3b.z + offsetZ - this._lastOffsetZ,
            false
        );

        this._lastOffsetX = offsetX;
        this._lastOffsetY = offsetY;
        this._lastOffsetZ = offsetZ;

    }

}

function makePNoise1D( length  : number , step  : number ) : number[] {

    const noise = [];
    const gradients = [];

    for ( let i = 0; i < length; i ++ ) {

        gradients[ i ] = Math.random() * 2 - 1;

    };

    for ( let t = 0; t < step; t ++ ) {

        const x = ( length - 1 ) / ( step - 1 ) * ( t );

        const i0 = x|0;
        const i1 = ( i0 + 1 )|0;

        const g0 = gradients[ i0 ];
        const g1 = gradients[ i1 ] || gradients[ i0 ];

        const u0 = x - i0;
        const u1 = u0 - 1;

        const n0 = g0 * u0;
        const n1 = g1 * u1;

        noise.push( n0 * ( 1 - fade( u0 ) ) + n1 * fade( u0 ) );

    }

    return noise;

}

function fade ( t : number ) : number {

    return t * t * t * ( t * ( 6 * t - 15 ) + 10 );

}

function sineOut( t : number) : number {

    return Math.sin( t * HALF_PI );
}
