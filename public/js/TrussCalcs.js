$( document ).ready(function() {

    function toRadians (angle) {
        return angle * (Math.PI / 180);
    }

    let truss_details = {
        span: "30-00-00", 
        heel_left: "1-0-0", 
        heel_right: "1-0-0", 
        cant_left: "00-00-00", 
        cant_right: "00-00-00", 
        pitch_left: "00-5-00", 
        pitch_right: "00-5-00", 
        oh_left: "00-00-00", 
        oh_right: "02-00-00", 
        oh_type: "unsure", 
        oh_cut: "plumb", 
        tc_type: "00-05-08", 
        bc_type: "00-03-08",
    }

    const CANVAS_HEIGHT = 400;
    const CANVAS_WIDTH = 900;

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

        pixelDist(sixteenths) {
            let truss_length = this.trussLength();
            return((CANVAS_HEIGHT/(truss_length)) * sixteenths);
        }

        pitchAngle(pitch) {
            let pitch_angle = Math.atan(pitch / (12*16))
            pitch_angle = (pitch_angle * 180) / Math.PI;
            return pitch_angle;
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

        riseInRun(run, angle) {
            let rise = (run * (Math.tan(toRadians(angle))));
            return rise;
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
        return((CANVAS_WIDTH/(truss_length)) * sixteenths);
    }


    function drawTruss(){
        
        // LEFT SIDE HEEL AND OVERHANG
        let oh_left_rise = truss.riseInRun(truss.oh_left + truss.cant_left, truss.pitchAngle(truss.pitch_left));
        let start_x = truss.oh_left;
        

        let left_y = 0;
        let start_at_overhang = false;

        if (oh_left_rise > truss.heel_left){
            left_y = oh_left_rise - truss.heel_left;
            start_at_overhang = true;
        } else {
            left_y = 0;
        }


        // RIGHT SIDE HEEL AND OVERHANG
        let oh_right_rise = truss.riseInRun(truss.oh_right + truss.cant_right, truss.pitchAngle(truss.pitch_right));
        finish_x = truss.solveForSides(["peakLeft"]) + truss.solveForSides(["peakRight"]);

        let right_y = 0;

        if (oh_right_rise > truss.heel_right){
            right_y = oh_right_rise - truss.heel_right;
        } else {
            right_y = 0;
        }

        starting_y = Math.max(left_y, right_y);


        let start_points = start_x + " " + starting_y;
        let left_heel_top = start_x + " " + (starting_y + truss.heel_left);
        
        // PEAK
        let peak = truss.solveForSides(["peakLeft"]) + " " + truss.peakHeight();


        


        let finish_points = finish_x + " " + starting_y;
        let right_heel_top = finish_x + " " + (starting_y + truss.heel_right);


        return invertPoints([start_points, left_heel_top, peak, right_heel_top, finish_points]);
    }


    function invertPoints(point_list = []) {
        
        let points = [];
        let X_inv = 0;
        let Y_inv = 0;

        point_list.forEach(function(item, index) {
            points = item.split(" ");
            X_inv = scaleDim(points[0]);
            Y_inv = (CANVAS_HEIGHT - scaleDim(points[1]));
            point_list[index] = (X_inv + " " + Y_inv);
        });

        return(point_list);

    }

    let svg_line = document.getElementById("truss-line")
    svg_line.setAttribute("points", drawTruss());
});
