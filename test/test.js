const StateMachine = require('javascript-state-machine')

var fsm = new StateMachine({
  init: 'off',
  transitions: [
    {name: 'weak', from: 'off', to: 'weak'},
    {name: 'strong', from: 'weak', to: 'strong'},
    {name: 'super', from: 'strong', to: 'super'},
    {name: 'on', from: 'strong', to: 'on'},
  ],
  methods: {
    onWeak: function(arg) {/*console.log(arg)*/}
  }
})

fsm.weak()
console.log(fsm.state)
console.log(fsm.is('weak'))
console.log(fsm.can('strong'))
console.log(fsm.transitions())
console.log(fsm.allTransitions())
console.log(fsm.allStates())
