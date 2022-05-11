varying vec2 v_uv;
uniform vec3 light;
uniform vec3 dark;

float randomNumberGenerator(float uv)
{
    return fract(sin(dot(uv,12.123456))*1234567.1234567);
}

void main()
{
    // work out the U coordinate
    float u = v_uv.x; 
    // work out the V coordinate
    float v = v_uv.y;
    float st = randomNumberGenerator(v);

    gl_FragColor = vec4(mix(light,dark,st), 1.);
}

