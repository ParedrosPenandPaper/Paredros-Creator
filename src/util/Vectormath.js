
    export function vOrthNorm(v){
        let hyp = length(v)
        return {
            x: -(v.y/hyp),
            y: v.x/hyp
        }
    }

    export function vScale(v, s){
        return {x: v.x*s, y: v.y*s}
    }

    export function vAdd(v1, v2){
        return {x: v1.x+v2.x, y: v1.y+v2.y}
    }

    export function vSub(v1, v2){
        return {x: v1.x-v2.x, y: v1.y-v2.y}
    }

    export function length(v){
        return Math.sqrt(v.x**2 + v.y**2)
    }