import { Header } from ".";

const Plans = () => {
    return (
        <div className="w-full h-auto flex-col items-center justify-center bg-primary">
            <Header />
            <div className="flex items-center justify-center gap-x-8 gap-y-3">
                <div className="flex items-center justify-center">
                    <form className="bg-[rgba(255,255,255,1)] w-max-[320px] rounded-lg p-5 text-neutral-700 shadow-lg">
                        <div className="text-center mt-3">
                            <span className="font-semibold">Premium Individual</span>
                            <p className="mt-2 text-xs">Amet minim mollit non deserunt ullamco est sit .</p>
                        </div>
                        <div className="mt-3 mb-4 plan-option">
                            <input value="free" id="free" name="plan" type="radio" />
                            <label for="free" className="cursor-pointer overflow-hidden border-2 border-[rgba(255,255,255,1)] flex items-center justify-between py-4 plan-option px-2 ease-in-out">
                                <div className="flex flex-col ml-2">
                                    <span className="text-xs">$0</span>
                                    <span className="text-xs">Try Free</span>
                                </div>
                            </label>
                        </div>
                        <div className="mt-3 mb-4 plan-option">
                            <input value="monthly" id="monthly" name="plan" type="radio" />
                            <label for="monthly">
                                <div className="flex flex-col ml-2">
                                    <span className="text-xs">$29/month</span>
                                    <span className="text-xs">Monthly plan</span>
                                </div>
                            </label>
                        </div>
                        <div className="mt-3 mb-4 plan-option">
                            <input value="annual" id="annual" name="plan" type="radio" />
                            <label for="annual">
                                <div className="flex flex-col ml-2">
                                    <span className="text-xs">$19/month</span>
                                    <span className="text-xs">$228 billed in a year</span>
                                </div>
                                <span className="inline-block rounded-full border border-[rgba(22,163,74,1)] px-1 py-2 font-semibold text-[rgba(22,163,74,1)]"> Save 20% </span>
                            </label>
                        </div>
                        <p title="" className="w-full inline-flex items-center justify-center rounded-sm px-12 py-4 plan-option ease-in-out hover:opacity-70"> Start </p>

                    </form>
                </div>
            </div>

        </div>
    );
}

export default Plans;