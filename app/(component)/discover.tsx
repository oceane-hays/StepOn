import React from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Search, Heart } from 'lucide-react-native';

export default function ExplorePlaces() {
    const categories = [
        { icon: '🏔️', name: 'Mountains' },
        { icon: '🏕️', name: 'Camping' },
        { icon: '🚣', name: 'Lake' },
        { icon: '🌲', name: 'Forest' },
    ];

    const trendingPlaces = [
        {
            name: 'Pogli Lake',
            distance: '12.3 km',
            image: '/placeholder.svg?height=200&width=150',
        },
        {
            name: 'Mountain Path',
            distance: '17.5 km',
            image: '/placeholder.svg?height=200&width=150',
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <Search color="#fff" size={20} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#fff"
                    />
                </View>
                <Image
                    source={{ uri: '/placeholder.svg?height=40&width=40' }}
                    style={styles.profilePic}
                />
            </View>

            <Text style={styles.title}>Explore places</Text>

            <View style={styles.categoriesSection}>
                <Text style={styles.sectionTitle}>Popular categories</Text>
                <View style={styles.categories}>
                    {categories.map((category, index) => (
                        <TouchableOpacity key={index} style={styles.categoryItem}>
                            <Text style={styles.categoryIcon}>{category.icon}</Text>
                            <Text style={styles.categoryName}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.trendingSection}>
                <View style={styles.trendingHeader}>
                    <Text style={styles.sectionTitle}>Trending visits</Text>
                    <TouchableOpacity>
                        <Text style={styles.viewAll}>View all</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {trendingPlaces.map((place, index) => (
                        <View key={index} style={styles.placeCard}>
                            <Image
                                source={{ uri: place.image }}
                                style={styles.placeImage}
                            />
                            <View style={styles.placeInfo}>
                                <Text style={styles.placeName}>{place.name}</Text>
                                <Text style={styles.placeDistance}>{place.distance}</Text>
                            </View>
                            <TouchableOpacity style={styles.likeButton}>
                                <Heart color="#fff" size={20} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2B3F',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: 10,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        marginLeft: 10,
        fontSize: 16,
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
    },
    categoriesSection: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 15,
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryItem: {
        width: 80,
        height: 80,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryIcon: {
        fontSize: 24,
        marginBottom: 5,
    },
    categoryName: {
        color: '#fff',
        fontSize: 12,
    },
    trendingSection: {
        flex: 1,
    },
    trendingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    viewAll: {
        color: '#fff',
        opacity: 0.6,
    },
    placeCard: {
        width: 200,
        height: 280,
        marginRight: 15,
        borderRadius: 20,
        overflow: 'hidden',
    },
    placeImage: {
        width: '100%',
        height: '100%',
    },
    placeInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 15,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    placeName: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    placeDistance: {
        color: '#fff',
        opacity: 0.8,
    },
    likeButton: {
        position: 'absolute',
        right: 15,
        bottom: 15,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

