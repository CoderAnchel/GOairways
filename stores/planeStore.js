import { defineStore } from 'pinia';
import { useToast } from "vue-toastification";

const toast = useToast();

export const usePlaneStore = defineStore("planeStore", {
    state: () => ({
        model: null,
        name: "",
        plate: "Generate",
    }),
    actions: {
        setModel(model) {
            this.model = model;
        },
        setName(name) {
            this.name = name;
        },
        async generatePlate() {
            console.log("click");
            let min = 65;
            let max = 90;

            while(true) {
                let platelist = [];

                for (let i = 0; i < 6; i++) {
                        let number = Math.random() * (max - min) + min;
                        number = Math.floor(number);
                        number = String.fromCharCode(number);
                        if (i === 2) {
                            platelist.push("-");
                        } else {
                            platelist.push(number);
                        }
                    }

                    const plate = platelist.join("")
                    const check = await checkPlate(plate)

                    if(check.message == "Matricula available") {
                        console.log(check.message)
                        console.log("Available: " + platelist);
                        this.plate = platelist.join("");
                        toast.success("Plate Generated!")
                        break;
                    } else {
                        console.log("working")
                    }
            }
        },
        async testingCheck() {
            console.log("click");
            let min = 65;
            let max = 90;

            let prueba = "EC-FA19"
            const check = await checkPlate(prueba)

            if(check.message == "Matricula available") {
                console.log(check.message)
                console.log("Available: " + prueba);
                this.plate = prueba
            } else {
                while(true) {
                    let platelist = [];

                    for (let i = 0; i < 6; i++) {
                            let number = Math.random() * (max - min) + min;
                            number = Math.floor(number);
                            number = String.fromCharCode(number);
                            if (i === 2) {
                                platelist.push("-");
                            } else {
                                platelist.push(number);
                            }
                        }

                        const plate = platelist.join("")
                        const check = await checkPlate(plate)

                        if(check.message == "Matricula available") {
                            console.log(check.message)
                            console.log("Available: " + platelist);
                            this.plate = platelist.join("");
                            toast.success("Plate Generated!")
                            break;
                        } else {
                            console.log("working")
                        }
                }
            }
        }
    },
});
