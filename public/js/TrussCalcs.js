$( document ).ready(function() {

    function toRadians (angle) {
        return angle * (Math.PI / 180);
    }

    let truss_details = {
        span: "30-00-00", 
        heel_left: "3-0-0", 
        heel_right: "1-0-0", 
        cant_left: "00-00-00", 
        cant_right: "00-00-00", 
        pitch_left: "00-6-00", 
        pitch_right: "00-6-00", 
        oh_left: "02-00-00", 
        oh_right: "02-00-00", 
        oh_type: "unsure", 
        oh_cut: "plumb", 
        tc_type: "00-05-08", 
        bc_type: "00-03-08",
    }

    const CANVAS_HEIGHT = 640;

    class Truss {
        constructor(span, heel_left, heel_right, cant_left, cant_right, pitch_left, pitch_right, oh_left, oh_right, oh_type, oh_cut, tc_type, bc_type) {
            this.span = this.rawToSixteenths(span);
            this.heel_left = this.rawToSixteenths(heel_left);
            this.heel_right = this.rawToSixteenths(heel_right);
            this.cant_left = this.rawToSixteenths(cant_left);
            this.cant_right = this.rawToSixteenths(cant_right);
            this.pitch_left = this.rawToSixteenths(pitch_left);
            this.pitch_right = this.rawToSixteenths(pitch_right);
            this.oh_left = this.rawToSixteenths(oh_left);
            this.oh_right = this.rawToSixteenths(oh_right);
            this.oh_type = oh_type;
            this.oh_cut = oh_cut;
            this.tc_type = this.rawToSixteenths(tc_type);
            this.bc_type = this.rawToSixteenths(bc_type);
        }

        peakHeight() {
            // PEAK HEIGHT IS THE HEIGHT FROM THE BEARING TO THE PEAK

            let truss_height = this.solveForSides("height") + this.heel_left;
            return truss_height;

            
        }

        trussHeight() {
            // TRUSS HEIGHT IS THE HEIGHT FROM THE LOWEST TO THE HIGHEST POINT ON THE TRUSS

        }

        trussLength() {
            let total_length = (this.oh_left + this.cant_left + this.span + this.cant_right +  this.oh_right);
            return(total_length);
        }

        LBP_Y() {
            // pretend to start at this point...add the heel height, then work backwards towards the end of the overhang--see if this is lower
            // than the height of the heel... if yes - the bearing height will be more than zero....for that side. Repeat for both sides.

            let tail_width = 0;
            if(this.oh_cut == "plumb"){
                // tail_width = (this.tc_type / Math.sin(this.pitchAngle(this.pitch_left)));
                tail_width = this.tc_type / Math.sin(90 - (toRadians(this.pitchAngle(this.pitch_left))))
            } else if (this.oh_cut == "squre") {
                tail_width = (Math.cos(90 - (to(this.pitchAngle(this.pitch_left)))) * this.tc_type)
            }

            // Test for left bearing point
            let rise_of_overhangs = ((this.oh_left + this.cant_left) * this.pitch_left) + tail_width;
            let bearing_y = 0;

            if (rise_of_overhangs > (this.heel_left)) {
                bearing_y = rise_of_overhangs - (this.heel_left);
            } else {
                bearing_y = 0;
            }
            return (bearing_y);
        }

        LBP_X() {
            let bearing_x = (this.oh_left + this.cant_left);
            return(bearing_x)
        }

        pixelDist(sixteenths) {
            let truss_length = this.trussLength();
            return((CANVAS_HEIGHT/(truss_length)) * sixteenths);
        }

        pitchAngle(pitch) {
            let pitchAngleKey = {16: 4.76, 32: 9.46, 48: 14.04, 64: 18.43, 80:22.62, 96: 26.57, 112:30.26, 128:33.69, 144: 36.87, 160:39.81, 176:42.51, 192:45}
            return pitchAngleKey[pitch];
        }

        rawToSixteenths(measurement) {
            let measList = measurement.split("-");
            let feet = measList[0];
            let inches = measList[1];
            let sixteenths = measList[2];

            return (feet * 12 * 16) + (inches * 16) + (+sixteenths)
        }

        solveForSides(value) {
            // Solve a triangle w/ A, B, and C as the angles (starting bottom right -> bottom left -> top angle)
            // Sides a, b, c as the sides opposing their respective angles

            let A = this.pitchAngle(this.pitch_left);
            let B = this.pitchAngle(this.pitch_right);
            let C = 180 - (A + B);

            let a = 0;
            let b = 0;
            let c = this.span;

            // a/sin A = c/sin C
            a = (c * (Math.sin(toRadians(A)))) / (Math.sin(toRadians(C)));
            b = (c * (Math.sin(toRadians(B)))) / (Math.sin(toRadians(C)));

            let h = b * (Math.sin(toRadians(A)));
            let peakDistfromLeft = b * (Math.cos(toRadians(A)));
            let peakDistfromRight = a * (Math.cos(toRadians(B)));

            let sides = {
                LeftSide: b,
                RightSide: a,
                height: h,
                peakLeft: peakDistfromLeft,
                peakRight: peakDistfromRight,
            }

            return(sides[value]);
        }
    }

    let truss = new Truss(
        truss_details.span,
        truss_details.heel_left,
        truss_details.heel_right,
        truss_details.cant_left,
        truss_details.cant_right,
        truss_details.pitch_left,
        truss_details.pitch_right,
        truss_details.oh_left,
        truss_details.oh_right,
        truss_details.oh_type,
        truss_details.oh_cut,
        truss_details.tc_type,
        truss_details.bc_type,
        )
    
    function scaleDim(sixteenths) {
        let truss_length = truss.trussLength();
        return((CANVAS_HEIGHT/(truss_length)) * sixteenths);
    }


    function drawTruss(){
        // Draw the left TC

        // Draw the right TC

        // 
    }

    // document.getElementByClassName("myCanvas").style.width = "300px"; 
    $(".myCanvas").width("1500px");

    drawTruss();
    const canvas = document.querySelector('.myCanvas');
    ctx = canvas.getContext('2d');

    // Set display size (css pixels).
    var size = 800;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";

    // Set actual size in memory (scaled to account for extra pixel density).
    var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    canvas.width = Math.floor(size * scale);
    canvas.height = Math.floor(size * scale);

    // Normalize coordinate system to use css pixels.
    ctx.scale(scale, scale);

    let peakHeight = truss.peakHeight();

    ctx.beginPath();       // Start a new path
    ctx.moveTo(0, 200);
    ctx.lineTo(scaleDim(truss.solveForSides("peakLeft")), 200-(scaleDim(peakHeight)));
    ctx.lineTo(scaleDim(truss.solveForSides("peakLeft")) + scaleDim(truss.solveForSides("peakRight")), 200);
    ctx.stroke();

    ctx.moveTo(scaleDim(truss.LBP_X()), 200 - scaleDim(truss.LBP_Y()))
    ctx.lineTo(scaleDim(truss.LBP_X() + truss.span), 200 - scaleDim(truss.LBP_Y()))
    ctx.stroke();

});
