// import MovieControls_C from './MovieControls.js'
//
// class FullScreen {
//     constructor() {
//         this._enabled = false
//     }
//
//     // Set body background
//     set_body_bg() {
//         if (this._enabled) {
//             document.body.style.background = "black";
//             this.disable_scroll()
//             this.scroll_to_player()
//         }
//         else {
//             document.body.style.background = "";
//             this.enable_scroll()
//         }
//     }
//
//     // Scroll view to players section
//     scroll_to_player() {
//         $('html, body').animate({
//             scrollTop: $("#section_movie").offset().top - 10
//         }, 500);
//
//         setTimeout(function () {
//             $('html, body').animate({
//                 scrollTop: $("#section_movie").offset().top - 10
//             }, 350);
//         }, 0)
//     }
//
//     // Enable scroll
//     enable_scroll() {
//         $('html, body').removeClass('no-scroll')
//         this.scroll_to_player()
//     }
//
//     // Disable scroll
//     disable_scroll() {
//         $('html, body').addClass('no-scroll')
//     }
//
//     // Toggle fullscreen on / off
//     toggle() {
//         this._enabled = !this._enabled
//         this.set_body_bg()
//         this.set_movie_controls_style()
//     }
//
//     // Set movie controls
//     set_movie_controls_style() {
//         MovieControls_C.set_fullscreen_controls_style(this._enabled)
//     }
// }
//
// const FullScreen_C = new FullScreen()
// export default FullScreen_C
