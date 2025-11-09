import { DestinationState } from '@/types/comman';
import SearchFilter from './SearchFilter';

interface Props {
    states: DestinationState[];
}

const StatesCityAccordion = ({ states }: Props) => {
    if (!states || states.length === 0) {
        return null;
    }

    return (
        <section className="py-12 px-4" aria-label="States and cities">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        Explore Destinations by State
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Discover cities and monuments across India
                    </p>
                </div>

                <SearchFilter states={states}/>
            </div>
        </section>
    );
};

export default StatesCityAccordion;